import { useState } from 'react';
import { AlertTriangle, Bell, UserCheck, Search, CheckCircle, Eye, Wrench, ShieldCheck } from 'lucide-react';
import { securityAlerts } from '@/data/mockData';
import type { SecurityAlert, AlertStatus, Severity } from '@/types';

const severityConfig: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  Critical: { color: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30', dot: 'bg-error-500' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', dot: 'bg-orange-500' },
  Medium: { color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30', dot: 'bg-warning-500' },
  Low: { color: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30', dot: 'bg-success-500' },
  Informational: { color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/30', dot: 'bg-accent-500' },
};

const statusConfig: Record<AlertStatus, { color: string; bg: string }> = {
  New: { color: 'text-error-400', bg: 'bg-error-500/10' },
  Reviewed: { color: 'text-accent-400', bg: 'bg-accent-500/10' },
  Assigned: { color: 'text-warning-400', bg: 'bg-warning-500/10' },
  Investigating: { color: 'text-primary-400', bg: 'bg-primary-500/10' },
  Resolved: { color: 'text-success-400', bg: 'bg-success-500/10' },
};

const assignees = ['Jordan Analyst', 'Alex Security', 'Sam Viewer'];

export function Alerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(securityAlerts);
  const [filter, setFilter] = useState<Severity | 'All'>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'All' ? alerts : alerts.filter((a) => a.severity === filter);

  const updateStatus = (id: string, status: AlertStatus, assignedTo?: string) => {
    setAlerts((prev) => prev.map((a) =>
      a.id === id ? { ...a, status, assignedTo: assignedTo ?? a.assignedTo } : a
    ));
  };

  const counts = {
    Critical: alerts.filter((a) => a.severity === 'Critical').length,
    High: alerts.filter((a) => a.severity === 'High').length,
    Medium: alerts.filter((a) => a.severity === 'Medium').length,
    Low: alerts.filter((a) => a.severity === 'Low').length,
    Informational: alerts.filter((a) => a.severity === 'Informational').length,
  };

  const selected = alerts.find((a) => a.id === selectedId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Security Alerts</h2>
        <p className="text-sm text-gray-500 mt-1">Track, triage, and resolve security findings across all monitored systems</p>
      </div>

      {/* Severity filter cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(['Critical', 'High', 'Medium', 'Low', 'Informational'] as Severity[]).map((sev) => {
          const cfg = severityConfig[sev];
          const active = filter === sev;
          return (
            <button
              key={sev}
              onClick={() => setFilter(active ? 'All' : sev)}
              className={`glass-card p-4 text-left transition-all duration-200 ${active ? 'ring-2 ring-primary-500/40' : 'hover:scale-[1.02]'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                <span className="text-xs text-gray-500">{sev}</span>
              </div>
              <p className={`text-2xl font-bold ${cfg.color}`}>{counts[sev]}</p>
            </button>
          );
        })}
      </div>

      {/* Alert list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="glass-card p-8 flex flex-col items-center justify-center">
              <Bell className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-500">No alerts for this severity level.</p>
            </div>
          ) : (
            filtered.map((alert) => {
              const cfg = severityConfig[alert.severity];
              const stCfg = statusConfig[alert.status];
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedId(alert.id)}
                  className={`glass-card p-4 cursor-pointer transition-all duration-200 ${selectedId === alert.id ? 'ring-2 ring-primary-500/40' : 'hover:border-primary-500/30'}`}
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
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${stCfg.bg} ${stCfg.color}`}>
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
            })
          )}
        </div>

        {/* Detail / actions panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="glass-card p-5 sticky top-20 animate-slide-up">
              <h3 className="text-sm font-semibold text-white mb-4">Alert Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Title</p>
                  <p className="text-sm text-white">{selected.title}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{selected.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Severity:</p>
                  <span className={`text-xs font-semibold ${severityConfig[selected.severity].color}`}>{selected.severity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status:</p>
                  <span className={`text-xs font-semibold ${statusConfig[selected.status].color}`}>{selected.status}</span>
                </div>
                {selected.assignedTo && (
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Assigned:</p>
                    <span className="text-xs text-gray-300">{selected.assignedTo}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Actions</p>
                <button
                  onClick={() => updateStatus(selected.id, 'Reviewed')}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-accent-400 hover:bg-accent-500/10 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" /> Mark as Reviewed
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selected.id, 'Assigned', assignees[0])}
                    className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg text-sm text-warning-400 hover:bg-warning-500/10 transition-all duration-200"
                  >
                    <UserCheck className="w-4 h-4" /> Assign
                  </button>
                  <select
                    onChange={(e) => updateStatus(selected.id, 'Assigned', e.target.value)}
                    className="glass-input px-2 py-2 text-xs w-32"
                    value={selected.assignedTo || ''}
                  >
                    <option value="" className="bg-base-800">Select...</option>
                    {assignees.map((a) => (
                      <option key={a} value={a} className="bg-base-800">{a}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => updateStatus(selected.id, 'Investigating')}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-primary-400 hover:bg-primary-500/10 transition-all duration-200"
                >
                  <Search className="w-4 h-4" /> Investigate
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'Resolved')}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-success-400 hover:bg-success-500/10 transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-500">Select an alert to view details and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
