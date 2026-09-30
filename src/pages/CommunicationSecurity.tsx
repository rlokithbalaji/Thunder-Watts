import { Lock, ShieldCheck, AlertTriangle, XCircle, Globe, Award, KeyRound } from 'lucide-react';
import { commSecurityItems } from '@/data/mockData';

const statusConfig = {
  secure: { icon: ShieldCheck, color: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30', label: 'SECURE' },
  warn: { icon: AlertTriangle, color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30', label: 'WARN' },
  fail: { icon: XCircle, color: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30', label: 'FAIL' },
};

const itemIcons: Record<string, typeof Lock> = {
  'HTTPS': Lock,
  'TLS Version': KeyRound,
  'Certificate Status': Award,
  'HSTS': ShieldCheck,
  'Content-Security-Policy': Globe,
  'X-Frame-Options': ShieldCheck,
  'X-Content-Type-Options': ShieldCheck,
  'Referrer-Policy': Globe,
  'Permissions-Policy': ShieldCheck,
};

export function CommunicationSecurity() {
  const secureCount = commSecurityItems.filter((i) => i.status === 'secure').length;
  const warnCount = commSecurityItems.filter((i) => i.status === 'warn').length;
  const failCount = commSecurityItems.filter((i) => i.status === 'fail').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Communication Security</h2>
        <p className="text-sm text-gray-500 mt-1">Transport layer security, TLS configuration, and security headers</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-success-400" />
            <span className="text-xs text-gray-500">Secure</span>
          </div>
          <p className="text-2xl font-bold text-success-400">{secureCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning-400" />
            <span className="text-xs text-gray-500">Warnings</span>
          </div>
          <p className="text-2xl font-bold text-warning-400">{warnCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-error-400" />
            <span className="text-xs text-gray-500">Failed</span>
          </div>
          <p className="text-2xl font-bold text-error-400">{failCount}</p>
        </div>
      </div>

      {/* Status cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commSecurityItems.map((item) => {
          const cfg = statusConfig[item.status];
          const Icon = itemIcons[item.label] || ShieldCheck;
          return (
            <div key={item.id} className={`glass-card p-5 ${cfg.border} border transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
                <span className={`text-xs font-bold tracking-wider ${cfg.color}`}>
                  {item.value}
                </span>
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
            </div>
          );
        })}
      </div>

      {/* TLS detail panel */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">TLS Configuration Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="px-4 py-3 rounded-xl bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Supported Protocols</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['TLS 1.3', 'TLS 1.2'].map((p) => (
                <span key={p} className="px-2 py-1 rounded-md text-[10px] font-semibold bg-success-500/15 text-success-400 border border-success-500/30">
                  {p}
                </span>
              ))}
              {['TLS 1.1', 'TLS 1.0'].map((p) => (
                <span key={p} className="px-2 py-1 rounded-md text-[10px] font-semibold bg-error-500/15 text-error-400 border border-error-500/30 line-through">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Cipher Suites (Preferred)</p>
            <div className="space-y-1 mt-2">
              {[
                'TLS_AES_256_GCM_SHA384',
                'TLS_CHACHA20_POLY1305_SHA256',
                'TLS_AES_128_GCM_SHA256',
              ].map((c) => (
                <p key={c} className="text-[10px] font-mono text-gray-400">{c}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 px-4 py-3 rounded-xl bg-success-500/5 border border-success-500/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-success-400 shrink-0" />
            <span className="text-xs text-success-400">SSL Labs Grade: A+ — Forward secrecy enabled, HSTS preloaded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
