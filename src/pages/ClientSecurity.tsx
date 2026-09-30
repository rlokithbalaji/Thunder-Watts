import { Globe, Cookie, Database, Code, FileCode, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { clientSecurityChecks } from '@/data/mockData';

const categoryIcons: Record<string, typeof Globe> = {
  'Security Headers': Globe,
  'Cookie Security': Cookie,
  'Browser Storage': Database,
  'JavaScript Configuration': Code,
  'Source Map Exposure': FileCode,
};

const statusConfig = {
  pass: { icon: CheckCircle, color: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30', label: 'Enabled' },
  warn: { icon: AlertTriangle, color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30', label: 'Needs Review' },
  fail: { icon: XCircle, color: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30', label: 'Failed' },
};

export function ClientSecurity() {
  const categories = [...new Set(clientSecurityChecks.map((c) => c.category))];
  const passCount = clientSecurityChecks.filter((c) => c.status === 'pass').length;
  const warnCount = clientSecurityChecks.filter((c) => c.status === 'warn').length;
  const failCount = clientSecurityChecks.filter((c) => c.status === 'fail').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Client-Side Security</h2>
        <p className="text-sm text-gray-500 mt-1">Browser security configuration, headers, cookies, and storage analysis</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-success-400" />
            <span className="text-xs text-gray-500">Passing</span>
          </div>
          <p className="text-2xl font-bold text-success-400">{passCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning-400" />
            <span className="text-xs text-gray-500">Needs Review</span>
          </div>
          <p className="text-2xl font-bold text-warning-400">{warnCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-error-400" />
            <span className="text-xs text-gray-500">Failing</span>
          </div>
          <p className="text-2xl font-bold text-error-400">{failCount}</p>
        </div>
      </div>

      {/* Quick status overview */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Security Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(['HTTPS', 'Secure Cookies', 'HttpOnly', 'SameSite', 'Content Security Policy'] as const).map((item) => {
            const check = clientSecurityChecks.find((c) => c.item === item);
            const status = check?.status || 'warn';
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            return (
              <div key={item} className={`flex flex-col items-center gap-2 p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                <Icon className={`w-5 h-5 ${cfg.color}`} />
                <span className="text-[10px] text-gray-400 text-center">{item}</span>
                <span className={`text-xs font-semibold ${cfg.color}`}>
                  {item === 'Content Security Policy' ? 'Needs Review' : 'Enabled'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category cards */}
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Globe;
        const checks = clientSecurityChecks.filter((c) => c.category === category);
        return (
          <div key={category} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-base-700/60">
                <Icon className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">{category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checks.map((check) => {
                const cfg = statusConfig[check.status];
                const StatusIcon = cfg.icon;
                return (
                  <div key={check.id} className={`flex items-start gap-3 px-4 py-3 rounded-xl ${cfg.bg} border ${cfg.border} transition-all duration-200 hover:scale-[1.01]`}>
                    <StatusIcon className={`w-5 h-5 ${cfg.color} shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white">{check.item}</p>
                        <span className={`text-[10px] font-semibold ${cfg.color} shrink-0`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{check.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
