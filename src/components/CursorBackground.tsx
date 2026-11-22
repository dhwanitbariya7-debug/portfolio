import { useEffect, useRef } from 'react';

interface CursorBackgroundProps {
  darkMode: boolean;
}

interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

export function CursorBackground({ darkMode }: CursorBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: GridPoint[] = [];

    // Smoothed cursor coordinates for fluid trailing motion
    const targetMouse = { x: width * 0.55, y: height * 0.35, active: false };
    const smoothMouse = { x: width * 0.55, y: height * 0.35 };

    const buildGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 768 ? 46 : 42;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      const nextPoints: GridPoint[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * spacing;
          const by = offsetY + r * spacing;
          nextPoints.push({ baseX: bx, baseY: by, x: bx, y: by });
        }
      }
      points = nextPoints;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;
    };

    const handlePointerLeave = () => {
      targetMouse.active = false;
    };

    buildGrid();
    window.addEventListener('resize', buildGrid);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    let rafId = 0;

    const renderFrame = () => {
      // Smooth exponential interpolation toward pointer
      const ease = prefersReducedMotion ? 1 : 0.1;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * ease;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * ease;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle ambient radial spotlight following the cursor
      const spotlightRadius = width < 768 ? 300 : 480;
      const glow = ctx.createRadialGradient(
        smoothMouse.x,
        smoothMouse.y,
        0,
        smoothMouse.x,
        smoothMouse.y,
        spotlightRadius
      );

      if (darkMode) {
        glow.addColorStop(0, 'rgba(59, 130, 246, 0.13)');
        glow.addColorStop(0.45, 'rgba(37, 99, 235, 0.05)');
        glow.addColorStop(1, 'rgba(7, 10, 16, 0)');
      } else {
        glow.addColorStop(0, 'rgba(29, 78, 216, 0.075)');
        glow.addColorStop(0.5, 'rgba(59, 130, 246, 0.025)');
        glow.addColorStop(1, 'rgba(248, 249, 251, 0)');
      }
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive architectural dot field with magnetic cursor displacement
      const influenceRadius = 210;
      const maxShift = prefersReducedMotion ? 0 : 12;
      const activeNodes: GridPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const dx = smoothMouse.x - pt.baseX;
        const dy = smoothMouse.y - pt.baseY;
        const dist = Math.hypot(dx, dy);

        let targetX = pt.baseX;
        let targetY = pt.baseY;
        let proximity = 0;

        if (dist < influenceRadius && dist > 0.001) {
          proximity = 1 - dist / influenceRadius;
          const smoothPull = proximity * proximity;
          // Gentle magnetic attraction toward cursor for fluid depth
          targetX = pt.baseX + (dx / dist) * smoothPull * maxShift;
          targetY = pt.baseY + (dy / dist) * smoothPull * maxShift;
          if (proximity > 0.34) {
            activeNodes.push(pt);
          }
        }

        pt.x += (targetX - pt.x) * 0.14;
        pt.y += (targetY - pt.y) * 0.14;

        const baseAlpha = darkMode ? 0.16 : 0.18;
        const alpha = baseAlpha + proximity * (darkMode ? 0.58 : 0.45);
        const radius = 1.05 + proximity * 1.15;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = darkMode
          ? proximity > 0.12
            ? `rgba(96, 165, 250, ${alpha.toFixed(3)})`
            : `rgba(148, 163, 184, ${alpha.toFixed(3)})`
          : proximity > 0.12
            ? `rgba(29, 78, 216, ${alpha.toFixed(3)})`
            : `rgba(100, 116, 139, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // 3. Delicate hairline vector links strictly between nodes near the cursor
      if (!prefersReducedMotion && activeNodes.length > 1) {
        const linkMaxDist = 66;
        ctx.lineWidth = 0.75;
        for (let i = 0; i < activeNodes.length; i++) {
          const a = activeNodes[i];
          for (let j = i + 1; j < activeNodes.length; j++) {
            const b = activeNodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < linkMaxDist) {
              const lineStrength = (1 - d / linkMaxDist) * (darkMode ? 0.22 : 0.14);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = darkMode
                ? `rgba(96, 165, 250, ${lineStrength.toFixed(3)})`
                : `rgba(29, 78, 216, ${lineStrength.toFixed(3)})`;
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
