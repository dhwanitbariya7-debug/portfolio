import { Check, Copy, Download, Eye, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CERTIFICATIONS, PROFILE, type CertificationItem } from '../data/portfolioData';

type CertFilter = 'all' | 'ai' | 'communication';

export function CertificationsLedger() {
  const [filter, setFilter] = useState<CertFilter>('all');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    if (filter !== 'all' && cert.category !== filter) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      cert.title.toLowerCase().includes(q) ||
      cert.issuer.toLowerCase().includes(q) ||
      cert.certificateId.toLowerCase().includes(q) ||
      cert.skillsCovered.some((s) => s.toLowerCase().includes(q))
    );
  });

  const handleCopyId = async (certId: string) => {
    try {
      await navigator.clipboard.writeText(certId);
      setCopiedId(certId);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-20 border-b border-[#E2E6EE] py-14 dark:border-[#1E2636]"
    >
      {/* Header + Filter Controls */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-[#64748B] dark:text-[#94A3B8]">
            03. Verified Credentials · LinkedIn Learning &amp; PMI® REP
          </p>
          <h2
            id="certifications-heading"
            className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] [text-wrap:balance]"
          >
            Certifications &amp; Continuing Education
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
            Every certificate below links directly to its original verified PDF record, complete
            with completion timestamps, PMI® provider metadata, and full credential hash IDs.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748B]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter credentials or skills..."
              aria-label="Filter certifications"
              className="h-9 w-full sm:w-56 rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] pl-8 pr-3 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#293548] dark:bg-[#111827] dark:text-[#F8FAFC]"
            />
          </div>

          <div
            role="group"
            aria-label="Filter certifications by topic"
            className="inline-flex items-center gap-1 rounded-lg bg-[#E9EEF5] p-1 dark:bg-[#111827] border border-[#E2E6EE] dark:border-[#1E2636]"
          >
            {[
              { id: 'all' as const, label: 'All (3)' },
              { id: 'ai' as const, label: 'AI & ML (1)' },
              { id: 'communication' as const, label: 'Communication (2)' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
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
      </div>

      {/* Credential Ledger Table */}
      <div className="mt-7 overflow-hidden rounded-xl border border-[#E2E6EE] bg-[#FFFFFF]/90 backdrop-blur-xs dark:border-[#1D2638] dark:bg-[#0E131E]/85">
        {filteredCerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <p className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
              No certifications match &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
              Clear your search filter to inspect all 3 verified credentials.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setQuery('');
              }}
              className="mt-4 rounded-lg border border-[#CBD5E1] px-4 py-2 text-xs font-medium text-[#0F172A] hover:bg-[#F1F5F9] dark:border-[#334155] dark:text-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E2E6EE] bg-[#F8FAFC] text-xs font-medium text-[#64748B] dark:border-[#1E2636] dark:bg-[#0D1320] dark:text-[#94A3B8]">
                  <th className="py-3.5 pl-6 pr-4">Credential &amp; Issuing Body</th>
                  <th className="px-4 py-3.5">Skills Covered</th>
                  <th className="px-4 py-3.5 text-right whitespace-nowrap">Completed</th>
                  <th className="px-4 py-3.5 text-right whitespace-nowrap">Credits / Runtime</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EE] dark:divide-[#1E2636]">
                {filteredCerts.map((cert) => (
                  <tr
                    key={cert.id}
                    className="transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#162032]/70"
                  >
                    <td className="py-5 pl-6 pr-4 align-top">
                      <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                        {cert.title}
                      </p>
                      <p className="mt-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                        {cert.issuer}
                        {cert.providerId && (
                          <>
                            {' '}
                            <span aria-hidden="true">·</span> Provider {cert.providerId}{' '}
                            <span aria-hidden="true">·</span> Activity {cert.activityNumber}
                          </>
                        )}
                      </p>
                      <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        <span>ID: {cert.certificateId.slice(0, 14)}…{cert.certificateId.slice(-6)}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyId(cert.certificateId)}
                          aria-label={`Copy full certificate ID for ${cert.title}`}
                          className="inline-flex items-center gap-1 text-[#1D4ED8] hover:underline dark:text-[#60A5FA]"
                        >
                          {copiedId === cert.certificateId ? (
                            <>
                              <Check className="h-3 w-3 text-[#16A34A]" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" aria-hidden="true" />
                              <span>Copy ID</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-top text-xs leading-relaxed text-[#334155] dark:text-[#CBD5E1] max-w-xs">
                      {cert.skillsCovered.join(' · ')}
                    </td>

                    <td className="px-4 py-5 align-top text-right font-mono text-xs tabular-nums text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap">
                      <div>{cert.completedDate}</div>
                      <div className="mt-0.5 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        {cert.completedTimeUtc}
                      </div>
                    </td>

                    <td className="px-4 py-5 align-top text-right font-mono text-xs tabular-nums text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap">
                      {cert.durationOrCredits}
                    </td>

                    <td className="py-5 pl-4 pr-6 align-top text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#0F172A] px-3 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:hover:bg-[#93C5FD] whitespace-nowrap shrink-0"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Inspect PDF</span>
                        </button>
                        <a
                          href={cert.pdfPath}
                          download={cert.fileName}
                          aria-label={`Download PDF for ${cert.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E6EE] text-[#475569] transition-colors hover:border-[#94A3B8] hover:text-[#0F172A] dark:border-[#293548] dark:text-[#CBD5E1] dark:hover:text-white"
                        >
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Certificate Inspector Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCert(null);
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#E2E6EE] bg-[#FFFFFF] shadow-xl dark:border-[#293548] dark:bg-[#0F172A]">
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E6EE] px-6 py-4 dark:border-[#1E293B]">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA]">
                  Verified Credential Record · {selectedCert.categoryLabel}
                </p>
                <h3
                  id="cert-modal-title"
                  className="mt-1 font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E6EE] text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] dark:border-[#293548] dark:text-[#CBD5E1] dark:hover:bg-[#1E293B] shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
              <div className="border-b border-[#E2E6EE] bg-[#F8FAFC] lg:col-span-8 lg:border-b-0 lg:border-r dark:border-[#1E293B] dark:bg-[#070B12]">
                <iframe
                  src={selectedCert.pdfPath}
                  title={selectedCert.title}
                  className="h-[55vh] w-full lg:h-[68vh]"
                />
              </div>

              <div className="flex flex-col justify-between gap-6 p-6 lg:col-span-4">
                <dl className="space-y-4 text-xs">
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Recipient</dt>
                    <dd className="mt-1 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      {PROFILE.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Issuing Organization</dt>
                    <dd className="mt-1 font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                      {selectedCert.issuer}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Completion Timestamp</dt>
                    <dd className="mt-1 font-mono tabular-nums text-[#0F172A] dark:text-[#F8FAFC]">
                      {selectedCert.completedDate} · {selectedCert.completedTimeUtc}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Duration / Contact Hours</dt>
                    <dd className="mt-1 font-mono tabular-nums text-[#0F172A] dark:text-[#F8FAFC]">
                      {selectedCert.durationOrCredits}
                    </dd>
                  </div>
                  {selectedCert.providerId && (
                    <div>
                      <dt className="text-[#64748B] dark:text-[#94A3B8]">PMI® Program Reference</dt>
                      <dd className="mt-1 font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                        Provider {selectedCert.providerId} · Activity {selectedCert.activityNumber}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Top Skills Covered</dt>
                    <dd className="mt-1 leading-relaxed text-[#0F172A] dark:text-[#F8FAFC]">
                      {selectedCert.skillsCovered.join(' · ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Signatory</dt>
                    <dd className="mt-1 text-[#0F172A] dark:text-[#F8FAFC]">
                      {selectedCert.signatory}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] dark:text-[#94A3B8]">Certificate ID</dt>
                    <dd className="mt-1 break-all font-mono text-[11px] text-[#334155] dark:text-[#CBD5E1]">
                      {selectedCert.certificateId}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-2 border-t border-[#E2E6EE] pt-4 dark:border-[#1E293B]">
                  <a
                    href={selectedCert.pdfPath}
                    download={selectedCert.fileName}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1E40AF] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyId(selectedCert.certificateId)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#CBD5E1] px-3 py-2.5 text-xs font-medium text-[#0F172A] hover:bg-[#F1F5F9] dark:border-[#334155] dark:text-[#F8FAFC] dark:hover:bg-[#1E293B]"
                  >
                    {copiedId === selectedCert.certificateId ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#16A34A]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
