import { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';

export function LearningTimeline() {
  const [activeId, setActiveId] = useState(TIMELINE_MILESTONES[3].id);
  const activeMilestone =
    TIMELINE_MILESTONES.find((m) => m.id === activeId) ?? TIMELINE_MILESTONES[0];

  const getPhaseColor = (phase: 'Completed' | 'In Progress' | 'Planned') => {
    if (phase === 'Completed') return 'text-[#15803D] dark:text-[#4ADE80]';
    if (phase === 'In Progress') return 'text-[#1D4ED8] dark:text-[#60A5FA]';
    return 'text-[#64748B] dark:text-[#94A3B8]';
  };

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="scroll-mt-20 py-14"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-wide text-[#64748B] dark:text-[#94A3B8]">
            04. First-Year Engineering Trajectory
          </p>
          <h2
            id="roadmap-heading"
            className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] [text-wrap:balance]"
          >
            Learning Timeline &amp; Roadmap
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
            Documenting steady first-year milestones across university CSE coursework, hardware
            prototyping, certified training, and upcoming AI &amp; ML priorities.
          </p>

          {/* Selected Milestone Detail Readout */}
          <div className="mt-7 border-t border-[#0F172A] pt-5 dark:border-[#475569]">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                {activeMilestone.dateLabel}
              </span>
              <span aria-hidden="true" className="text-[#CBD5E1] dark:text-[#334155]">
                /
              </span>
              <span className={`font-semibold ${getPhaseColor(activeMilestone.phase)}`}>
                {activeMilestone.phase}
              </span>
              <span aria-hidden="true" className="text-[#CBD5E1] dark:text-[#334155]">
                /
              </span>
              <span className="text-[#64748B] dark:text-[#94A3B8]">{activeMilestone.domain}</span>
            </div>

            <h3 className="mt-2 font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {activeMilestone.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              {activeMilestone.summary}
            </p>
            <p className="mt-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="font-medium text-[#0F172A] dark:text-[#E2E8F0]">Artifact: </span>
              {activeMilestone.artifact}
            </p>
          </div>
        </div>

        {/* Chronological Interactive Index */}
        <div className="lg:col-span-7">
          <ol className="divide-y divide-[#E2E6EE] rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 backdrop-blur-xs dark:divide-[#1D2638] dark:border-[#1D2638] dark:bg-[#0E131E]/85">
            {TIMELINE_MILESTONES.map((milestone, index) => {
              const isSelected = milestone.id === activeMilestone.id;
              return (
                <li key={milestone.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(milestone.id)}
                    aria-current={isSelected ? 'step' : undefined}
                    className={`flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1D4ED8] ${
                      isSelected
                        ? 'bg-[#F1F5F9] dark:bg-[#162032]'
                        : 'hover:bg-[#F8FAFC] dark:hover:bg-[#162032]/50'
                    }`}
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <span className="mt-0.5 font-mono text-xs tabular-nums text-[#64748B] dark:text-[#94A3B8] shrink-0">
                        0{index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          {milestone.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                          {milestone.domain} <span aria-hidden="true">·</span> {milestone.dateLabel}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-medium whitespace-nowrap shrink-0 ${getPhaseColor(
                        milestone.phase
                      )}`}
                    >
                      {milestone.phase}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
