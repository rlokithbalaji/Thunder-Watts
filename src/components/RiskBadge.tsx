import type { RiskLevel } from '@/types';

const riskConfig: Record<RiskLevel, string> = {
  Critical: 'bg-error-500/15 text-error-400 border border-error-500/30',
  High: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
  Medium: 'bg-warning-500/15 text-warning-400 border border-warning-500/30',
  Low: 'bg-success-500/15 text-success-400 border border-success-500/30',
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${riskConfig[risk]}`}>
      {risk}
    </span>
  );
}
