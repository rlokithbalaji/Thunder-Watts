import { useState } from 'react';
import { ArrowLeft, Shield, Activity, Eye, Wrench, History, AlertTriangle, Search, ArrowUpDown } from 'lucide-react';
import { allVulnerabilities } from '@/data/mockData';
import { VulnerabilityTable } from '@/components/VulnerabilityTable';
import { useDebounce } from '@/hooks/useDebounce';
import type { Vulnerability, Severity } from '@/types';

type SortKey = 'severity' | 'cvss' | 'detected' | 'aiConfidence';

const severityOrder: Record<Severity, number> = {
  Critical: 5, High: 4, Medium: 3, Low: 2, Informational: 1,
};

export function Vulnerabilities() {
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Vulnerability | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('severity');
  const [sortDesc, setSortDesc] = useState(true);
  const debouncedSearch = useDebounce(search, 200);

  const filters = ['All', 'Critical', 'High', 'Medium', 'Low', 'Resolved'];

  const filtered = allVulnerabilities.filter((v) => {
    if (filter === 'All') return true;
    if (filter === 'Resolved') return v.status === 'Resolved';
    return v.severity === filter;
  }).filter((v) => {
    if (!debouncedSearch) return true;
    const s = debouncedSearch.toLowerCase();
    return v.title.toLowerCase().includes(s) || v.id.toLowerCase().includes(s) || v.component.toLowerCase().includes(s);
  }).sort((a, b) => {
    let cmp = 0;
    if (sortKey === 'severity') cmp = severityOrder[a.severity] - severityOrder[b.severity];
    else if (sortKey === 'cvss') cmp = a.cvss - b.cvss;
    else if (sortKey === 'aiConfidence') cmp = a.aiConfidence - b.aiConfidence;
    else cmp = a.detected.localeCompare(b.detected);
    return sortDesc ? -cmp : cmp;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDesc(!sortDesc);
    else { setSortKey(key); setSortDesc(true); }
  };

  const sevClass = (sev: Severity) => `severity-${sev.toLowerCase()}`;
  const statusClass = (status: string) => {
    if (status === 'Resolved') return 'text-success-400 bg-success-500/10';
    if (status === 'Investigating') return 'text-warning-400 bg-warning-500/10';
    if (status === 'Retesting') return 'text-accent-400 bg-accent-500/10';
    return 'text-error-400 bg-error-500/10';
  };

  if (selected) {
    return <VulnDetail vuln={selected} onBack={() => setSelected(null)} sevClass={sevClass} statusClass={statusClass} />;
  }

  const sortBtns: { key: SortKey; label: string }[] = [
    { key: 'severity', label: 'Severity' },
    { key: 'cvss', label: 'CVSS' },
    { key: 'detected', label: 'Date' },
    { key: 'aiConfidence', label: 'AI' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Vulnerabilities</h2>
        <p className="text-sm text-gray-500 mt-1">Manage and track {allVulnerabilities.length} security findings across all applications</p>
      </div>

      {/* Search + Sort */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, title, or component..."
            className="glass-input w-full pl-10 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider hidden sm:inline">Sort</span>
          {sortBtns.map((s) => (
            <button
              key={s.key}
              onClick={() => toggleSort(s.key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${sortKey === s.key ? 'bg-primary-600/15 text-primary-300 border border-primary-600/40' : 'bg-base-700/40 text-gray-400 border border-base-600/60'}`}
            >
              {s.label}
              <ArrowUpDown className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-primary-600/20 text-primary-300 border border-primary-600/40'
                : 'bg-base-700/40 text-gray-400 border border-base-600/60 hover:text-gray-300'
            }`}
          >
            {f}
            <span className="ml-1.5 text-gray-500">
              {f === 'All' ? allVulnerabilities.length : f === 'Resolved'
                ? allVulnerabilities.filter((v) => v.status === 'Resolved').length
                : allVulnerabilities.filter((v) => v.severity === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-base-600/60 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">All Findings</h3>
          <span className="text-xs text-gray-500">{filtered.length} results</span>
        </div>
        <VulnerabilityTable vulnerabilities={filtered} onSelect={setSelected} />
      </div>
    </div>
  );
}

interface DetailProps {
  vuln: Vulnerability;
  onBack: () => void;
  sevClass: (sev: Severity) => string;
  statusClass: (status: string) => string;
}

function VulnDetail({ vuln, onBack, sevClass, statusClass }: DetailProps) {
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'evidence', label: 'Evidence', icon: Eye },
    { id: 'poc', label: 'PoC', icon: Activity },
    { id: 'remediation', label: 'Remediation', icon: Wrench },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Vulnerabilities
      </button>

      <div className="glass-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-gray-500">{vuln.id}</span>
              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${sevClass(vuln.severity)}`}>
                {vuln.severity}
              </span>
              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-medium ${statusClass(vuln.status)}`}>
                {vuln.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{vuln.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{vuln.component}</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] text-gray-500 uppercase">CVSS</p>
              <p className="text-lg font-bold text-white">{vuln.cvss}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase">CWE</p>
              <p className="text-sm font-mono text-gray-300 mt-1">{vuln.cwe}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase">AI Confidence</p>
              <p className="text-lg font-bold text-primary-400">{vuln.aiConfidence}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-base-600/60 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === t.id ? 'border-primary-500 text-primary-300' : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="glass-card p-6">
        {tab === 'overview' && (
          <div className="space-y-5">
            <Section title="Description" content={vuln.description} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Section title="Affected Component" content={vuln.component} />
              <Section title="Severity" content={vuln.severity} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Section title="CVSS Score" content={vuln.cvss.toString()} />
              <Section title="CWE Reference" content={vuln.cwe} />
            </div>
            <Section title="AI Confidence" content={`${vuln.aiConfidence}% — This finding was identified and classified by the AI security analyzer with high confidence based on pattern matching and behavioral analysis.`} />
            <Section title="Impact" content={vuln.impact} />
          </div>
        )}

        {tab === 'evidence' && (
          <div className="space-y-5">
            <Section title="Evidence" content={vuln.evidence} mono />
            <Section title="Expected Behavior" content={vuln.expectedBehavior} />
            <Section title="Observed Behavior" content={vuln.observedBehavior} />
          </div>
        )}

        {tab === 'poc' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-warning-500/10 border border-warning-500/30">
              <AlertTriangle className="w-4 h-4 text-warning-400 shrink-0" />
              <p className="text-xs text-warning-400">
                Proof-of-concept content is limited to authorized test environments. Do not use against systems you do not have explicit permission to test.
              </p>
            </div>
            <Section title="Steps to Reproduce" content={vuln.stepsToReproduce} mono />
            <Section title="Expected Behavior" content={vuln.expectedBehavior} />
            <Section title="Observed Behavior" content={vuln.observedBehavior} />
          </div>
        )}

        {tab === 'remediation' && (
          <div className="space-y-5">
            <Section title="Remediation" content={vuln.remediation} />
            <Section title="Retest Status" content={vuln.retestStatus} />
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-3">
            {vuln.history.map((h, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-base-700/40">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-200">{h.action}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{h.date} · {h.user}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, content, mono }: { title: string; content: string; mono?: boolean }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</h4>
      <p className={`text-sm text-gray-300 leading-relaxed ${mono ? 'font-mono text-xs bg-base-900/60 p-4 rounded-xl border border-base-600/60 whitespace-pre-wrap' : ''}`}>
        {content}
      </p>
    </div>
  );
}
