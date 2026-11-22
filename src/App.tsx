import { ArrowDownRight, ArrowUpRight, Download, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CertificationsLedger } from './components/CertificationsLedger';
import { CursorBackground } from './components/CursorBackground';
import { LearningTimeline } from './components/LearningTimeline';
import { MorseBuddyWorkbench } from './components/MorseBuddyWorkbench';
import { SkillsExplorer } from './components/SkillsExplorer';
import { TopBar } from './components/TopBar';
import { CERTIFICATIONS, KPI_METRICS, PROFILE, SKILL_DOMAINS } from './data/portfolioData';

function escapeCsv(val: string): string {
  return `"${val.replace(/"/g, '""')}"`;
}

function exportPortfolioCsv() {
  const rows: string[][] = [
    ['Section', 'Title', 'Detail', 'Date / Stage', 'Reference / Link'],
    [
      'Profile',
      PROFILE.name,
      `${PROFILE.degree} at ${PROFILE.university}`,
      PROFILE.academicYear,
      PROFILE.linkedinUrl,
    ],
    [
      'Project',
      'Morse Buddy (Arduino + OLED)',
      'Standalone matte-black Arduino Morse console with 0.96" SSD1306 I2C OLED (Learn + Sound, Practice, Quiz) and Red/Green LEDs',
      'Completed',
      'I2C OLED · MORSE/SEL/MNU/BCK Deck · Dual LEDs',
    ],
    ...SKILL_DOMAINS.map((skill) => [
      'Skill',
      skill.name,
      skill.evidenceTitle,
      skill.stage,
      skill.keyTopics.join('; '),
    ]),
    ...CERTIFICATIONS.map((cert) => [
      'Certification',
      cert.title,
      `${cert.issuer} (${cert.durationOrCredits})`,
      `${cert.completedDate} ${cert.completedTimeUtc}`,
      `ID: ${cert.certificateId}`,
    ]),
  ];

  const csvContent = rows.map((r) => r.map(escapeCsv).join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dhwanit-bariya-portfolio-summary.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    try {
      const saved = localStorage.getItem('dhwanit.portfolio.theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
    } catch {
      // Default to dark
    }
    return true;
  });
  const [portraitError, setPortraitError] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('dhwanit.portfolio.theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage restrictions
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-[#F8F9FB] text-[#0F172A] transition-colors duration-200 dark:bg-[#070A10] dark:text-[#F1F5F9]">
      {/* Smooth Interactive Cursor-Reactive Background */}
      <CursorBackground darkMode={darkMode} />

      <div className="relative z-10">
        <a
          href="#overview"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#0F172A] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
        >
          Skip to portfolio content
        </a>

        <TopBar />

        <main className="mx-auto max-w-[1360px] px-5 sm:px-8">
          {/* Hero & Overview Section */}
          <section
            id="overview"
            aria-labelledby="hero-heading"
            className="scroll-mt-20 border-b border-[#E2E6EE] pt-8 pb-14 dark:border-[#1D2638]"
          >
            {/* Workspace Utility Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E6EE] pb-5 dark:border-[#1D2638]">
              <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                <span>{PROFILE.university}</span>
                <span aria-hidden="true" className="mx-2 text-[#CBD5E1] dark:text-[#334155]">
                  /
                </span>
                <span>CSE with AI &amp; ML</span>
                <span aria-hidden="true" className="mx-2 text-[#CBD5E1] dark:text-[#334155]">
                  /
                </span>
                <span className="text-[#0F172A] dark:text-[#E2E8F0]">{PROFILE.academicYear}</span>
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={exportPortfolioCsv}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E6EE] bg-[#FFFFFF]/90 px-3 text-xs font-medium text-[#334155] transition-colors hover:border-[#94A3B8] hover:text-[#0F172A] dark:border-[#1D2638] dark:bg-[#0E131E]/90 dark:text-[#CBD5E1] dark:hover:border-[#475569] dark:hover:text-white whitespace-nowrap shrink-0"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode((prev) => !prev)}
                  aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E6EE] bg-[#FFFFFF]/90 px-3 text-xs font-medium text-[#334155] transition-colors hover:border-[#94A3B8] hover:text-[#0F172A] dark:border-[#1D2638] dark:bg-[#0E131E]/90 dark:text-[#CBD5E1] dark:hover:border-[#475569] dark:hover:text-white whitespace-nowrap shrink-0"
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-[#475569]" aria-hidden="true" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2-Column Executive Hero with Compact Passport-Size Portrait */}
            <div className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
              {/* Left Primary Anchor: Passport Photo Identity Lockup + Display Headline */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  {/* Compact Passport-Size Photo (35x45 ratio) + Name & Academic Identity */}
                  <div className="flex items-center gap-5">
                    <div className="relative h-[126px] w-[98px] sm:h-[136px] sm:w-[106px] shrink-0 overflow-hidden rounded-lg border border-[#CBD5E1] bg-[#E2E8F0] shadow-sm dark:border-[#2A364F] dark:bg-[#111827]">
                      {!portraitError ? (
                        <img
                          src={PROFILE.photoPath}
                          alt="Passport portrait of Dhwanit Bariya"
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitError(true)}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          DB
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wide text-[#1D4ED8] dark:text-[#60A5FA]">
                        Personal Portfolio Dashboard
                      </p>
                      <p className="mt-1 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                        {PROFILE.name}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                        B.Tech CSE (AI &amp; ML) · First Year
                      </p>
                      <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#64748B]">
                        {PROFILE.university}
                      </p>
                    </div>
                  </div>

                  <h1
                    id="hero-heading"
                    className="mt-7 max-w-2xl font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.09] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] [text-wrap:balance]"
                  >
                    {PROFILE.headline}
                  </h1>

                  <p className="mt-5 max-w-xl text-[15px] sm:text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                    {PROFILE.subheadline}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] whitespace-nowrap shrink-0"
                  >
                    <span>Explore Morse Buddy</span>
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#certifications"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-[#FFFFFF]/90 px-5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#94A3B8] hover:bg-[#F1F5F9] dark:border-[#243047] dark:bg-[#0E131E]/90 dark:text-[#F8FAFC] dark:hover:border-[#475569] dark:hover:bg-[#161F31] whitespace-nowrap shrink-0"
                  >
                    <span>Inspect 3 Certificates</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Clean Grounded Engineering Dossier */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 p-6 sm:p-7 backdrop-blur-xs dark:border-[#1D2638] dark:bg-[#0E131E]/85">
                  <div>
                    <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Current Focus Summary
                    </p>
                    <h2 className="mt-1.5 font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      First-Year Engineering Snapshot
                    </h2>

                    <dl className="mt-5 divide-y divide-[#E2E6EE] border-t border-[#E2E6EE] text-xs dark:divide-[#1D2638] dark:border-[#1D2638]">
                      <div className="py-3.5">
                        <dt className="text-[#64748B] dark:text-[#94A3B8]">Primary Language</dt>
                        <dd className="mt-1 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          C Programming Language
                        </dd>
                      </div>
                      <div className="py-3.5">
                        <dt className="text-[#64748B] dark:text-[#94A3B8]">Hardware Prototype</dt>
                        <dd className="mt-1 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          Morse Buddy · Arduino + 0.96&quot; OLED (Learn, Practice, Quiz)
                        </dd>
                      </div>
                      <div className="py-3.5">
                        <dt className="text-[#64748B] dark:text-[#94A3B8]">Latest Credential</dt>
                        <dd className="mt-1 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          AI Foundations: Thinking Machines · Nov 22, 2026
                        </dd>
                      </div>
                      <div className="py-3.5">
                        <dt className="text-[#64748B] dark:text-[#94A3B8]">PMI® Leadership Credit</dt>
                        <dd className="mt-1 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          Leadership through Feedback · 1.25 PDUs (Nov 16, 2026)
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E2E6EE] pt-4 text-xs dark:border-[#1D2638]">
                    <span className="font-mono text-[#64748B] dark:text-[#94A3B8]">
                      Karnavati University · Year 1
                    </span>
                    <a
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:underline dark:text-[#60A5FA] whitespace-nowrap shrink-0"
                    >
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column KPI Strip Below Hero Split */}
            <div className="mt-12 grid grid-cols-1 divide-y divide-[#E2E6EE] border-y border-[#E2E6EE] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x dark:divide-[#1D2638] dark:border-[#1D2638]">
              {KPI_METRICS.map((kpi, idx) => (
                <div
                  key={kpi.id}
                  className={`py-6 ${
                    idx === 0
                      ? 'lg:pr-6'
                      : idx === KPI_METRICS.length - 1
                        ? 'lg:pl-6'
                        : 'lg:px-6'
                  } ${idx % 2 === 1 ? 'sm:pl-6 lg:pl-6' : 'sm:pr-6'} ${
                    idx >= 2
                      ? 'sm:border-t sm:border-[#E2E6EE] lg:border-t-0 dark:sm:border-[#1D2638]'
                      : ''
                  }`}
                >
                  <p className="font-display text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums text-[#0F172A] dark:text-[#F8FAFC]">
                    {kpi.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#334155] dark:text-[#E2E8F0]">
                    {kpi.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#94A3B8]">{kpi.context}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 01. About Me & Core Competencies */}
          <SkillsExplorer />

          {/* 02. Featured Project: Morse Buddy OLED Hardware Workbench */}
          <MorseBuddyWorkbench />

          {/* 03. Verified Certifications & Credential Inspector */}
          <CertificationsLedger />

          {/* 04. First-Year Timeline & Roadmap */}
          <LearningTimeline />
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="border-t border-[#E2E6EE] bg-[#FFFFFF]/90 backdrop-blur-xs dark:border-[#1D2638] dark:bg-[#0A0E17]/90">
          <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-4 px-5 py-8 text-xs text-[#64748B] sm:flex-row sm:items-center sm:px-8 dark:text-[#94A3B8]">
            <div>
              <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                {PROFILE.name}
              </span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{PROFILE.university} · B.Tech CSE (AI &amp; ML), First Year</span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#0F172A] hover:text-[#1D4ED8] dark:text-[#E2E8F0] dark:hover:text-[#60A5FA]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={exportPortfolioCsv}
                className="font-medium text-[#0F172A] hover:text-[#1D4ED8] dark:text-[#E2E8F0] dark:hover:text-[#60A5FA]"
              >
                Download Summary CSV
              </button>
              <a
                href="#overview"
                className="font-medium text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]"
              >
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
