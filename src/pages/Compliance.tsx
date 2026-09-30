import { ShieldCheck, AlertTriangle, Info, ExternalLink, FileCheck, Lock, Eye, ScrollText, Users, Database, Network } from 'lucide-react';
import { complianceItems, complianceFrameworks } from '@/data/mockData';

const itemIcons: Record<string, typeof ShieldCheck> = {
  'Authorized Testing': FileCheck,
  'Data Privacy': Lock,
  'Audit Logging': ScrollText,
  'Role-Based Access': Users,
  'Evidence Tracking': Eye,
  'Secure Communication': Network,
};

export function Compliance() {
  const allPass = complianceItems.every((c) => c.status === 'pass');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Compliance & Governance</h2>
        <p className="text-sm text-gray-500 mt-1">Security governance posture and framework alignment</p>
      </div>

      {/* Overall status banner */}
      <div className={`glass-card p-5 ${allPass ? 'border-success-500/30' : 'border-warning-500/30'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${allPass ? 'bg-success-500/15' : 'bg-warning-500/15'}`}>
            <ShieldCheck className={`w-7 h-7 ${allPass ? 'text-success-400' : 'text-warning-400'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Governance Status</h3>
            <p className="text-xs text-gray-500">
              {allPass
                ? 'All governance checks passing — authorized testing environment verified'
                : 'Some governance items need attention'}
            </p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-success-500/10 border border-success-500/30">
            <span className="text-xs font-semibold text-success-400">{complianceItems.length}/{complianceItems.length} Checks Passing</span>
          </div>
        </div>
      </div>

      {/* Compliance checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complianceItems.map((item) => {
          const Icon = itemIcons[item.label] || ShieldCheck;
          return (
            <div key={item.id} className="glass-card glass-card-hover p-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-success-500/10 shrink-0">
                  <Icon className="w-5 h-5 text-success-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <ShieldCheck className="w-4 h-4 text-success-400 shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-warning-500/5 border border-warning-500/20">
        <Info className="w-4 h-4 text-warning-400 shrink-0" />
        <span className="text-xs text-warning-400">
          These checks reflect internal governance practices. They do not constitute formal compliance certification.
        </span>
      </div>

      {/* Framework references */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileCheck className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">Framework References</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceFrameworks.map((fw) => (
            <div key={fw.id} className="px-4 py-4 rounded-xl bg-base-700/40 border border-base-600/60 hover:border-primary-500/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{fw.name}</p>
                <a
                  href={fw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{fw.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment scope */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Assessment Scope</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="px-4 py-3 rounded-xl bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Environment</p>
            <p className="text-sm text-white">Production-like Demo</p>
          </div>
          <div className="px-4 py-3 rounded-xl bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Applications</p>
            <p className="text-sm text-white">6 authorized targets</p>
          </div>
          <div className="px-4 py-3 rounded-xl bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Assessment Period</p>
            <p className="text-sm text-white">Sep 1 — Sep 30, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
