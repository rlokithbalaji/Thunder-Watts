import { useState } from 'react';
import { Plus, Server, X, ShieldCheck, Globe, Cpu, User, Lock } from 'lucide-react';
import { applications as initialApps } from '@/data/mockData';
import type { Application, RiskLevel } from '@/types';

export function Applications() {
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', environment: '', baseUrl: '', technology: '', owner: '',
  });
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState(false);

  const riskClass = (risk: RiskLevel) => {
    switch (risk) {
      case 'Critical': return 'severity-critical';
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      case 'Low': return 'severity-low';
      default: return 'severity-info';
    }
  };

  const statusClass = (status: string) => {
    if (status === 'Online') return 'status-online';
    return 'status-offline';
  };

  const handleSubmit = () => {
    if (!authorized) {
      setAuthError(true);
      return;
    }
    const newApp: Application = {
      id: `app${apps.length + 1}`,
      name: form.name,
      description: form.description,
      environment: form.environment,
      baseUrl: form.baseUrl,
      technology: form.technology,
      owner: form.owner,
      status: 'Online',
      securityScore: 0,
      lastAssessment: 'Not assessed',
      risk: 'Low',
    };
    setApps([...apps, newApp]);
    setForm({ name: '', description: '', environment: '', baseUrl: '', technology: '', owner: '' });
    setAuthorized(false);
    setAuthError(false);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your authorized applications</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary px-4 py-2.5 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>

      {/* Application cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {apps.map((app, i) => (
          <div
            key={app.id}
            className="glass-card glass-card-hover p-5 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent-600/15">
                  <Server className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{app.name}</h3>
                  <p className="text-[10px] text-gray-500">{app.environment}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${statusClass(app.status)}`}>
                {app.status}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{app.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{app.baseUrl}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{app.technology}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <User className="w-3.5 h-3.5 shrink-0" />
                <span>{app.owner}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-base-600/60">
              <div>
                <p className="text-[10px] text-gray-500">Security Score</p>
                <p className="text-lg font-bold text-white">
                  {app.securityScore > 0 ? `${app.securityScore}%` : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">Risk Level</p>
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold mt-0.5 ${riskClass(app.risk)}`}>
                  {app.risk}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">Last Assessment</p>
                <p className="text-xs text-gray-300 mt-0.5">{app.lastAssessment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Application Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-600/15">
                  <Plus className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Add Application</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-base-700 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Application Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. World Monitor Web"
                  className="glass-input w-full px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the application"
                  rows={2}
                  className="glass-input w-full px-3 py-2.5 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Environment</label>
                  <select
                    value={form.environment}
                    onChange={(e) => setForm({ ...form, environment: e.target.value })}
                    className="glass-input w-full px-3 py-2.5 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="Production-like Demo">Production-like Demo</option>
                    <option value="Staging">Staging</option>
                    <option value="Test Environment">Test Environment</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Base URL</label>
                  <input
                    type="text"
                    value={form.baseUrl}
                    onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
                    placeholder="https://demo.example.app"
                    className="glass-input w-full px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Technology</label>
                  <input
                    type="text"
                    value={form.technology}
                    onChange={(e) => setForm({ ...form, technology: e.target.value })}
                    placeholder="React / Node.js"
                    className="glass-input w-full px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Owner</label>
                  <input
                    type="text"
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                    placeholder="Owner name"
                    className="glass-input w-full px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* Authorization confirmation */}
              <div className={`p-4 rounded-xl border transition-all ${authError ? 'border-error-500/40 bg-error-500/5' : 'border-base-500 bg-base-700/40'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={authorized}
                    onChange={(e) => { setAuthorized(e.target.checked); setAuthError(false); }}
                    className="mt-0.5 w-4 h-4 rounded border-base-500 bg-base-700 text-primary-600 focus:ring-primary-500/30"
                  />
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-300 leading-relaxed">
                      I confirm that I am authorized to assess this application.
                    </span>
                  </div>
                </label>
                {authError && (
                  <p className="text-[10px] text-error-400 mt-2 ml-7">
                    Authorization confirmation is required before an assessment can be started.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-600/5 border border-primary-600/20">
                <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
                <p className="text-[10px] text-primary-400">
                  Testing is restricted to authorized environments and synthetic/demo data.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-2.5 text-sm">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="btn-primary flex-1 py-2.5 text-sm">
                  Add Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
