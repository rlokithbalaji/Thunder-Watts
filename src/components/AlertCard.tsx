import { AlertTriangle, UserCheck, Info, ShieldCheck } from 'lucide-react';
import type { SecurityAlert } from '@/types';

const severityConfig: Record<string, { color: string; bg: string; border: string }> = {
  Critical: { color: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  Medium: { color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30' },
  Low: { color: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30' },
  Informational: { color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/30' },
};

const statusIcons: Record<string, typeof AlertTriangle> = {
  New: AlertTriangle,
  Reviewed: Info,
  Assigned: UserCheck,
  Investigating: AlertTriangle,
  Resolved: ShieldCheck,
};

export function AlertCard({ alert, onClick }: { alert: SecurityAlert; onClick?: () => void }) {
  const cfg = severityConfig[alert.severity] || severityConfig.Informational;
  const StatusIcon = statusIcons[alert.status] || Info;

  return (
    <div
      onClick={onClick}
      className={`glass-card p-4 cursor-pointer transition-all duration-200 hover:border-primary-500/30 ${onClick ? '' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${cfg.bg} shrink-0`}>
          <AlertTriangle className={`w-4 h-4 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
              {alert.severity}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <StatusIcon className="w-3 h-3" />
              {alert.status}
            </span>
            <span className="text-[10px] text-gray-500">{alert.time}</span>
          </div>
          <p className="text-sm font-medium text-white">{alert.title}</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{alert.description}</p>
          {alert.assignedTo && (
            <div className="flex items-center gap-1 mt-2">
              <UserCheck className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] text-gray-400">{alert.assignedTo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
