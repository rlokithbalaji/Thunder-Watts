import { Lock, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import type { AuditEntry } from '@/types';

const resultConfig: Record<string, { icon: typeof ShieldCheck; color: string; bg: string }> = {
  Success: { icon: ShieldCheck, color: 'text-success-400', bg: 'bg-success-500/10' },
  Denied: { icon: AlertTriangle, color: 'text-warning-400', bg: 'bg-warning-500/10' },
  Error: { icon: XCircle, color: 'text-error-400', bg: 'bg-error-500/10' },
};

interface AuditTableProps {
  entries: AuditEntry[];
  maxRows?: number;
}

export function AuditTable({ entries, maxRows }: AuditTableProps) {
  const rows = maxRows ? entries.slice(0, maxRows) : entries;

  return (
    <div className="overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-600/60">
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Resource</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Result</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">IP / Environment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => {
              const cfg = resultConfig[entry.result];
              const Icon = cfg.icon;
              return (
                <tr key={entry.id} className="border-b border-base-700/40 hover:bg-base-700/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{entry.timestamp}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{entry.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{entry.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{entry.resource}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
                      <Icon className="w-3 h-3" />
                      {entry.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500 hidden lg:table-cell">{entry.ip}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-2">
        {rows.map((entry) => {
          const cfg = resultConfig[entry.result];
          const Icon = cfg.icon;
          return (
            <div key={entry.id} className="px-4 py-3 rounded-xl bg-base-700/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-gray-500">{entry.timestamp}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
                  <Icon className="w-3 h-3" />
                  {entry.result}
                </span>
              </div>
              <p className="text-sm text-gray-300">{entry.action}</p>
              <p className="text-xs text-gray-500">{entry.user} · {entry.resource}</p>
              <p className="text-[10px] font-mono text-gray-600 mt-1">{entry.ip}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ImmutableBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-accent-500/10 text-accent-400 border border-accent-500/30">
      <Lock className="w-3 h-3" />
      Immutable
    </span>
  );
}
