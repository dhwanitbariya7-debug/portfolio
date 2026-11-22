import { Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { PROFILE, SKILL_DOMAINS, type SkillCategory } from '../data/portfolioData';

type FilterOption = 'all' | SkillCategory;

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All Domains' },
  { id: 'engineering', label: 'C & Hardware' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'communication', label: 'Communication' },
];

export function SkillsExplorer() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILL_DOMAINS[0].id);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const visibleSkills =
    filter === 'all'
      ? SKILL_DOMAINS
      : SKILL_DOMAINS.filter((item) => item.category === filter);

  const activeSkill =
    visibleSkills.find((s) => s.id === selectedSkillId) ?? visibleSkills[0] ?? SKILL_DOMAINS[0];

  const handleCopyLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.linkedinUrl);
      setCopiedLinkedIn(true);
      window.setTimeout(() => setCopiedLinkedIn(false), 2000);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-b border-[#E2E6EE] py-14 dark:border-[#1E2636]"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: About Me & Academic Record */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#64748B] dark:text-[#94A3B8]">
              01. Profile &amp; Academic Background
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] [text-wrap:balance]"
            >
              About Dhwanit Bariya
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              {PROFILE.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Clean Structured Academic Ledger (no nested cards) */}
          <dl className="border-t border-[#E2E6EE] pt-5 text-sm dark:border-[#1E2636]">
            <div className="flex flex-col gap-1 border-b border-[#E2E6EE]/70 py-3 sm:flex-row sm:items-baseline sm:justify-between dark:border-[#1E2636]">
              <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">Institution</dt>
              <dd className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">{PROFILE.university}</dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-[#E2E6EE]/70 py-3 sm:flex-row sm:items-baseline sm:justify-between dark:border-[#1E2636]">
              <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">Program</dt>
              <dd className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">CSE with AI &amp; ML</dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-[#E2E6EE]/70 py-3 sm:flex-row sm:items-baseline sm:justify-between dark:border-[#1E2636]">
              <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">Current Year</dt>
              <dd className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">First Year Undergraduate</dd>
            </div>
            <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">LinkedIn</dt>
              <dd className="flex items-center gap-3">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#1D4ED8] hover:underline dark:text-[#60A5FA]"
                >
                  <span>dhwanit-bariya-961a87326</span>
                  <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyLinkedIn}
                  aria-label="Copy LinkedIn profile URL"
                  className="inline-flex items-center gap-1 rounded-md border border-[#E2E6EE] px-2 py-1 text-xs font-medium text-[#475569] transition-colors hover:border-[#94A3B8] hover:text-[#0F172A] dark:border-[#293548] dark:text-[#CBD5E1] dark:hover:text-white whitespace-nowrap shrink-0"
                >
                  {copiedLinkedIn ? (
                    <>
                      <Check className="h-3 w-3 text-[#16A34A]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Interactive Core Competencies & Evidence Matrix */}
        <div className="lg:col-span-7 rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 p-6 sm:p-8 backdrop-blur-xs dark:border-[#1D2638] dark:bg-[#0E131E]/85">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Core Domains &amp; Supporting Evidence
              </h3>
              <p className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
                Select any competency row to inspect its coursework, hardware build, or verified credential.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter skill domains"
              className="inline-flex items-center gap-1 rounded-lg bg-[#F1F5F9] p-1 dark:bg-[#0B0F17]"
            >
              {FILTER_TABS.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setFilter(tab.id);
                      const firstMatch =
                        tab.id === 'all'
                          ? SKILL_DOMAINS[0]
                          : SKILL_DOMAINS.find((s) => s.category === tab.id);
                      if (firstMatch) setSelectedSkillId(firstMatch.id);
                    }}
                    aria-pressed={active}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs dark:bg-[#1E293B] dark:text-[#F8FAFC]'
                        : 'text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Skill Rows with SVG Focus Bars */}
          <div className="mt-6 divide-y divide-[#E2E6EE] border-y border-[#E2E6EE] dark:divide-[#1E2636] dark:border-[#1E2636]">
            {visibleSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`w-full py-4 px-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1D4ED8] ${
                    isSelected
                      ? 'bg-[#F8FAFC] dark:bg-[#162032]'
                      : 'hover:bg-[#F8FAFC]/70 dark:hover:bg-[#162032]/50'
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          {skill.name}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                        {skill.categoryLabel} <span aria-hidden="true">·</span> {skill.stage}
                      </p>
                    </div>

                    {/* Visual focus indicator (clean SVG bar, no arbitrary percentage score) */}
                    <div className="flex items-center gap-3 sm:w-44 shrink-0">
                      <svg
                        viewBox="0 0 120 6"
                        className="h-1.5 w-full overflow-hidden rounded-full"
                        aria-hidden="true"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="120"
                          height="6"
                          rx="3"
                          className="fill-[#E2E8F0] dark:fill-[#1E293B]"
                        />
                        <rect
                          x="0"
                          y="0"
                          width={(skill.focusWeight / 100) * 120}
                          height="6"
                          rx="3"
                          className={
                            isSelected
                              ? 'fill-[#1D4ED8] dark:fill-[#60A5FA]'
                              : 'fill-[#64748B] dark:fill-[#475569]'
                          }
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Claim-to-Proof Adjacent Evidence Readout */}
          <div className="mt-6 pt-1">
            <p className="text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA]">
              Supporting Evidence · {activeSkill.stage}
            </p>
            <h4 className="mt-1.5 text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {activeSkill.evidenceTitle}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
              {activeSkill.evidenceDetail}
            </p>
            <p className="mt-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="font-medium text-[#0F172A] dark:text-[#E2E8F0]">Core Topics: </span>
              {activeSkill.keyTopics.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
