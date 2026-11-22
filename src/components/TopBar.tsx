import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'About', href: '#about' },
  { label: 'Morse Buddy', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Roadmap', href: '#roadmap' },
];

export function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E6EE] bg-[#F8F9FB]/90 backdrop-blur-md dark:border-[#1D2638] dark:bg-[#070A10]/85">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#overview"
          className="font-display text-lg font-semibold tracking-tight text-[#0F172A] transition-colors hover:text-[#1D4ED8] dark:text-[#F8FAFC] dark:hover:text-[#60A5FA] whitespace-nowrap shrink-0"
        >
          {PROFILE.name}
        </a>

        {/* Zone 2: Clean single-line typography navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569] dark:text-[#94A3B8]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0F172A] hover:underline hover:underline-offset-4 dark:hover:text-[#F8FAFC]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:hover:bg-[#93C5FD] whitespace-nowrap shrink-0"
          >
            <span>LinkedIn Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E6EE] text-[#0F172A] md:hidden dark:border-[#1E2636] dark:text-[#F8FAFC]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E2E6EE] bg-[#FFFFFF] px-5 py-4 md:hidden dark:border-[#1E2636] dark:bg-[#111827]"
        >
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#F8FAFC] dark:hover:bg-[#1E293B]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0F172A] px-4 py-2.5 text-xs font-semibold text-white dark:bg-[#F8FAFC] dark:text-[#0F172A]"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
