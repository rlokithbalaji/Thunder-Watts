import { Database, ShieldCheck, AlertTriangle, Lock, Eye, HardDrive, FileText, Archive } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { dataProtectionMetrics, dataProtectionCategories } from '@/data/mockData';

const categoryIcons: Record<string, typeof Database> = {
  'Personal Data': Database,
  'Authentication Data': Lock,
  'Application Data': HardDrive,
  'Logs': FileText,
  'Backups': Archive,
};

export function DataProtection() {
  const metrics = [
    { label: 'Encrypted Data', value: dataProtectionMetrics.encryptedData, suffix: '%', icon: Lock, color: 'text-success-400' },
    { label: 'Sensitive Fields Protected', value: dataProtectionMetrics.sensitiveFieldsProtected, suffix: '%', icon: ShieldCheck, color: 'text-success-400' },
    { label: 'PII Exposure Alerts', value: dataProtectionMetrics.piiExposureAlerts, suffix: '', icon: AlertTriangle, color: 'text-warning-400' },
    { label: 'Unprotected Storage', value: dataProtectionMetrics.unprotectedStorage, suffix: '', icon: Eye, color: 'text-success-400' },
  ];

  const scoreColor = (pct: number) => {
    if (pct >= 95) return '#22c55e';
    if (pct >= 85) return '#06b6d4';
    if (pct >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Data Protection</h2>
        <p className="text-sm text-gray-500 mt-1">Encryption coverage, sensitive field protection, and PII monitoring</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="glass-card glass-card-hover p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="p-2 rounded-lg bg-base-700/60 inline-block mb-2">
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Category breakdown */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-5">Data Protection by Category</h3>
        <div className="space-y-4">
          {dataProtectionCategories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Database;
            const pct = Math.round((cat.encrypted / cat.total) * 100);
            const color = scoreColor(pct);
            return (
              <div key={cat.name} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-base-700/60 shrink-0">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-200">{cat.name}</span>
                    <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-base-700/60 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{cat.encrypted} of {cat.total} data stores encrypted</p>
                </div>
                <div className="shrink-0">
                  {pct >= 95 ? (
                    <ShieldCheck className="w-5 h-5 text-success-400" />
                  ) : pct >= 85 ? (
                    <ShieldCheck className="w-5 h-5 text-primary-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PII exposure alerts */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning-400" />
          <h3 className="text-sm font-semibold text-white">PII Exposure Alerts</h3>
        </div>
        <div className="space-y-2">
          {[
            { source: 'API Response — /api/users/:id', field: 'email', severity: 'Medium', action: 'Add field to response allowlist exclusion' },
            { source: 'Log Entry — Auth Service', field: 'phone_number', severity: 'Low', action: 'Configure log redaction for PII fields' },
            { source: 'Browser Storage — localStorage', field: 'session_token', severity: 'Medium', action: 'Move to HttpOnly cookie storage' },
          ].map((alert, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-base-700/40 hover:bg-base-700/60 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning-500/15 text-warning-400 shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm text-gray-200">{alert.source}</p>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-warning-500/15 text-warning-400 border border-warning-500/30">
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Exposed field: <span className="font-mono text-gray-400">{alert.field}</span></p>
                <p className="text-xs text-primary-400 mt-1">Recommended: {alert.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encryption methods */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Encryption Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { method: 'AES-256-GCM', scope: 'Data at rest', status: 'pass' },
            { method: 'TLS 1.3', scope: 'Data in transit', status: 'pass' },
            { method: 'Argon2id', scope: 'Password hashing', status: 'pass' },
          ].map((e) => (
            <div key={e.method} className="px-4 py-3 rounded-xl bg-base-700/40 border border-base-600/60">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-success-400" />
                <span className="text-sm font-mono font-semibold text-white">{e.method}</span>
              </div>
              <p className="text-xs text-gray-500">{e.scope}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
