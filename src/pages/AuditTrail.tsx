import { useState } from 'react';
import { ScrollText, Lock, Search, Download } from 'lucide-react';
import { AuditTable, ImmutableBadge } from '@/components/AuditTable';
import { auditTrail } from '@/data/mockData';

export function AuditTrail() {
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState<'All' | 'Success' | 'Denied' | 'Error'>('All');

  const filtered = auditTrail.filter((entry) => {
    const matchesSearch = !search ||
      entry.user.toLowerCase().includes(search.toLowerCase()) ||
      entry.action.toLowerCase().includes(search.toLowerCase()) ||
      entry.resource.toLowerCase().includes(search.toLowerCase());
    const matchesResult = resultFilter === 'All' || entry.result === resultFilter;
    return matchesSearch && matchesResult;
  });

  const handleExport = () => {
    const csv = ['Timestamp,User,Action,Resource,Result,IP'];
    filtered.forEach((e) => csv.push(`${e.timestamp},${e.user},${e.action},${e.resource},${e.result},${e.ip}`));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-trail.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Audit Trail</h2>
          <p className="text-sm text-gray-500 mt-1">Immutable record of all security-relevant actions</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-400 hover:bg-primary-500/10 border border-primary-500/30 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500/5 border border-accent-500/20">
        <Lock className="w-4 h-4 text-accent-400 shrink-0" />
        <span className="text-xs text-accent-400">All audit records are immutable and tamper-evident. Records cannot be modified or deleted.</span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action, or resource..."
            className="glass-input w-full pl-10 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {(['All', 'Success', 'Denied', 'Error'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setResultFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${resultFilter === r ? 'bg-primary-600/15 text-primary-300 border border-primary-600/40' : 'bg-base-700/40 text-gray-400 border border-base-600/60'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-base-600/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Audit Records</h3>
          </div>
          <div className="flex items-center gap-2">
            <ImmutableBadge />
            <span className="text-xs text-gray-500">{filtered.length} entries</span>
          </div>
        </div>
        <AuditTable entries={filtered} />
      </div>
    </div>
  );
}
