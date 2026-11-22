import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import morseHeroImg from '../assets/images/morse_buddy_hero_studio_1795345647049.jpg';
import morseOledImg from '../assets/images/morse_buddy_oled_closeup_1795345639549.jpg';
import morseQuizImg from '../assets/images/morse_buddy_quiz_circuit_1795345639064.jpg';

interface ShowcasePhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  caption: string;
  aspect: string;
}

const SHOWCASE_PHOTOS: ShowcasePhoto[] = [
  {
    id: 'console-hero',
    src: morseHeroImg,
    title: 'Morse Buddy — Assembled Hardware Console',
    subtitle: 'Final Matte Black Enclosure · 4-Button Control Deck',
    caption:
      'Finished Arduino console featuring four tactile push buttons (MORSE, SEL, MNU, BCK), dual Red/Green feedback LEDs, a top-mounted 0.96" I2C OLED display, and USB power.',
    aspect: '16:9',
  },
  {
    id: 'oled-macro',
    src: morseOledImg,
    title: '0.96" I2C OLED Menu Interface',
    subtitle: 'SSD1306 Display · GND VDD SCK SDA',
    caption:
      'Close-up of the monochrome OLED menu showing Learn + Sound, Practice, and Quiz modes navigated through the MNU and BCK tactile switches.',
    aspect: '4:3',
  },
  {
    id: 'quiz-circuit',
    src: morseQuizImg,
    title: 'Quiz Mode & Breadboard LED Verification',
    subtitle: 'Arduino Prototype · Live Green LED Feedback',
    caption:
      'Breadboard circuit validation stage testing real-time Morse code matching — illuminating the bright green LED and rendering "Correct!" on the OLED screen.',
    aspect: '4:3',
  },
];

const HARDWARE_SPECS = [
  { label: 'Controller', value: 'Arduino Uno (C / Arduino Firmware)' },
  { label: 'Display Module', value: '0.96" I2C OLED (SSD1306 · GND/VDD/SCK/SDA)' },
  { label: 'Device Modes', value: 'Learn + Sound · Practice · Quiz' },
  { label: 'Physical Deck', value: '4 Tactile Switches (MORSE · SEL · MNU · BCK)' },
  { label: 'Visual Feedback', value: 'Dual Red & Green Status LEDs' },
];

export function MorseBuddyWorkbench() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % SHOWCASE_PHOTOS.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null
            ? null
            : (prev - 1 + SHOWCASE_PHOTOS.length) % SHOWCASE_PHOTOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIdx]);

  const markFailed = (id: string) => {
    setFailedIds((prev) => ({ ...prev, [id]: true }));
  };

  const heroPhoto = SHOWCASE_PHOTOS[0];
  const detailPhotos = SHOWCASE_PHOTOS.slice(1);
  const activePhoto = lightboxIdx !== null ? SHOWCASE_PHOTOS[lightboxIdx] : null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-b border-[#E2E6EE] py-14 dark:border-[#1D2638]"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-[#64748B] dark:text-[#94A3B8]">
            02. Featured Hardware Project · Arduino · 0.96&quot; I2C OLED
          </p>
          <h2
            id="projects-heading"
            className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] [text-wrap:balance]"
          >
            Morse Buddy — Hardware Showcase
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
            A standalone Arduino Morse Code learning console designed and built in Year 1,
            combining C logic, a 0.96&quot; SSD1306 OLED menu, four tactile controls, and dual LED
            verification. Click any photograph to inspect in fullscreen.
          </p>
        </div>

        <p className="font-mono text-xs tabular-nums text-[#64748B] dark:text-[#94A3B8]">
          3 Studio Captures <span aria-hidden="true">·</span> Click to expand
        </p>
      </div>

      {/* Top Row: Wide 16:9 Hero Hardware Photograph + Architectural Spec Sheet */}
      <div className="mt-7 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        <figure className="group relative overflow-hidden rounded-xl border border-[#E2E6EE] bg-[#060910] lg:col-span-8 dark:border-[#1D2638]">
          <button
            type="button"
            onClick={() => setLightboxIdx(0)}
            className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#3B82F6]"
            aria-label={`Inspect ${heroPhoto.title} in fullscreen`}
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#060910]">
              {!failedIds[heroPhoto.id] ? (
                <img
                  src={heroPhoto.src}
                  alt={heroPhoto.title}
                  referrerPolicy="no-referrer"
                  onError={() => markFailed(heroPhoto.id)}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-8 text-sm text-[#94A3B8]">
                  {heroPhoto.title}
                </div>
              )}
            </div>

            {/* Measured bottom scrim for crisp 4.5:1+ caption readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#93C5FD]">{heroPhoto.subtitle}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {heroPhoto.title}
                  </p>
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/25 bg-black/50 text-white backdrop-blur-xs transition-colors group-hover:border-[#60A5FA] group-hover:text-[#93C5FD] shrink-0">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        </figure>

        {/* Right Column: Clean Project Spec Sheet */}
        <div className="flex flex-col justify-between rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 p-6 backdrop-blur-xs lg:col-span-4 dark:border-[#1D2638] dark:bg-[#0E131E]/85">
          <div>
            <p className="text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA]">
              Hardware Architecture
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Built from Circuit to Enclosure
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
              Morse Buddy guides learners from reading dot-dash symbols to live keyed quizzes using
              a dedicated microcontroller interface and instant LED feedback.
            </p>

            <dl className="mt-5 divide-y divide-[#E2E6EE] border-t border-[#E2E6EE] text-xs dark:divide-[#1D2638] dark:border-[#1D2638]">
              {HARDWARE_SPECS.map((spec) => (
                <div key={spec.label} className="py-3">
                  <dt className="text-[#64748B] dark:text-[#94A3B8]">{spec.label}</dt>
                  <dd className="mt-0.5 font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Row: 2-Column 4:3 Detail Gallery */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {detailPhotos.map((photo, idx) => {
          const photoIndex = idx + 1;
          return (
            <figure
              key={photo.id}
              className="group overflow-hidden rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 backdrop-blur-xs dark:border-[#1D2638] dark:bg-[#0E131E]/85"
            >
              <button
                type="button"
                onClick={() => setLightboxIdx(photoIndex)}
                className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#3B82F6]"
                aria-label={`Inspect ${photo.title} in fullscreen`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#060910]">
                  {!failedIds[photo.id] ? (
                    <img
                      src={photo.src}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      onError={() => markFailed(photo.id)}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6 text-sm text-[#94A3B8]">
                      {photo.title}
                    </div>
                  )}
                  <span className="pointer-events-none absolute right-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-black/55 text-white opacity-90 backdrop-blur-xs transition-colors group-hover:border-[#60A5FA] group-hover:text-[#93C5FD]">
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>

                <figcaption className="p-5">
                  <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                    {photo.subtitle}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {photo.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                    {photo.caption}
                  </p>
                </figcaption>
              </button>
            </figure>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Viewer */}
      {activePhoto && lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIdx(null);
          }}
        >
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#243047] bg-[#0B101A] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#1D2638] px-5 py-3.5">
              <div className="min-w-0">
                <p className="font-mono text-xs tabular-nums text-[#60A5FA]">
                  0{lightboxIdx + 1} / 0{SHOWCASE_PHOTOS.length} · {activePhoto.subtitle}
                </p>
                <h3
                  id="lightbox-title"
                  className="truncate font-display text-base font-semibold text-[#F8FAFC]"
                >
                  {activePhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx(
                      (lightboxIdx - 1 + SHOWCASE_PHOTOS.length) % SHOWCASE_PHOTOS.length
                    )
                  }
                  aria-label="Previous photo"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#243047] text-[#CBD5E1] hover:border-[#60A5FA] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % SHOWCASE_PHOTOS.length)}
                  aria-label="Next photo"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#243047] text-[#CBD5E1] hover:border-[#60A5FA] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Close photo viewer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#243047] text-[#CBD5E1] hover:border-[#60A5FA] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#05070C] p-2 sm:p-4">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto max-w-full rounded-md object-contain"
              />
            </div>

            <div className="border-t border-[#1D2638] px-5 py-3.5 text-xs leading-relaxed text-[#94A3B8]">
              {activePhoto.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
