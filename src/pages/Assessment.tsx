import { useState } from 'react';
import { ScanSearch, Globe, Smartphone, Network, Server, ShieldCheck, Check, Loader2, Play } from 'lucide-react';

type AssessmentType = 'web' | 'mobile' | 'api' | 'infrastructure';

interface SecurityCategory {
  id: string;
  label: string;
  defaultChecked: boolean;
}

const categories: SecurityCategory[] = [
  { id: 'auth', label: 'Authentication', defaultChecked: true },
  { id: 'session', label: 'Session Management', defaultChecked: true },
  { id: 'authz', label: 'Authorization', defaultChecked: true },
  { id: 'input', label: 'Input Validation', defaultChecked: true },
  { id: 'api', label: 'API Security', defaultChecked: true },
  { id: 'client', label: 'Client-Side Security', defaultChecked: true },
  { id: 'comm', label: 'Secure Communication', defaultChecked: true },
  { id: 'data', label: 'Data Protection', defaultChecked: true },
];

const assessmentTypes: { id: AssessmentType; label: string; icon: typeof Globe; desc: string }[] = [
  { id: 'web', label: 'Web Application', icon: Globe, desc: 'Test web apps for OWASP Top 10' },
  { id: 'mobile', label: 'Mobile Application', icon: Smartphone, desc: 'iOS / Android security testing' },
  { id: 'api', label: 'API', icon: Network, desc: 'REST / GraphQL endpoint analysis' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server, desc: 'Server and network security' },
];

export function Assessment() {
  const [type, setType] = useState<AssessmentType>('web');
  const [scope, setScope] = useState({ target: '', environment: '', tester: '', startDate: '', endDate: '' });
  const [selectedCats, setSelectedCats] = useState<Set<string>>(
    new Set(categories.filter((c) => c.defaultChecked).map((c) => c.id))
  );
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(false);

  const toggleCat = (id: string) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startAssessment = () => {
    if (!authorized) {
      setAuthError(true);
      return;
    }
    setRunning(true);
    setResults(false);
    setTimeout(() => {
      setRunning(false);
      setResults(true);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">New Security Assessment</h2>
        <p className="text-sm text-gray-500 mt-1">Configure and launch an authorized security assessment</p>
      </div>

      {/* AI Safety Controls banner */}
      <div className="glass-card p-5 border-error-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-error-500/15">
            <ShieldCheck className="w-6 h-6 text-error-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-error-400 tracking-wide">AUTHORIZED TESTING ONLY</h3>
            <p className="text-xs text-gray-500">AI operates in Safe Assessment Mode — analysis only, never execution</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="px-3 py-2 rounded-lg bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Required Before Assessment</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Target application / URL</li>
              <li>• Environment specification</li>
              <li>• Authorization confirmation</li>
            </ul>
          </div>
          <div className="px-3 py-2 rounded-lg bg-base-700/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">AI Safety Constraints</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Tester identity recorded</li>
              <li>• Assessment scope defined</li>
              <li>• No automatic attack execution</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-warning-500/10 border border-warning-500/30">
        <ShieldCheck className="w-5 h-5 text-warning-400 shrink-0" />
        <p className="text-xs text-warning-400">
          Testing is restricted to authorized environments and synthetic/demo data. Do not assess systems you do not have explicit permission to test.
        </p>
      </div>

      {/* Assessment type */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Assessment Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {assessmentTypes.map((at) => {
            const Icon = at.icon;
            const active = type === at.id;
            return (
              <button
                key={at.id}
                onClick={() => setType(at.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  active
                    ? 'border-primary-600/50 bg-primary-600/10'
                    : 'border-base-500 bg-base-700/40 hover:border-base-400'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${active ? 'text-primary-400' : 'text-gray-400'}`} />
                <p className={`text-sm font-medium ${active ? 'text-primary-300' : 'text-gray-300'}`}>{at.label}</p>
                <p className="text-[10px] text-gray-500 mt-1">{at.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assessment scope */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Assessment Scope</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Target Application / URL</label>
            <input
              type="text"
              value={scope.target}
              onChange={(e) => setScope({ ...scope, target: e.target.value })}
              placeholder="https://demo.worldmonitor.app"
              className="glass-input w-full px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Environment</label>
            <select
              value={scope.environment}
              onChange={(e) => setScope({ ...scope, environment: e.target.value })}
              className="glass-input w-full px-3 py-2.5 text-sm"
            >
              <option value="">Select environment...</option>
              <option value="Production-like Demo">Production-like Demo</option>
              <option value="Staging">Staging</option>
              <option value="Test Environment">Test Environment</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Tester</label>
            <input
              type="text"
              value={scope.tester}
              onChange={(e) => setScope({ ...scope, tester: e.target.value })}
              placeholder="Assigned tester name"
              className="glass-input w-full px-3 py-2.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Start Date</label>
              <input
                type="date"
                value={scope.startDate}
                onChange={(e) => setScope({ ...scope, startDate: e.target.value })}
                className="glass-input w-full px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">End Date</label>
              <input
                type="date"
                value={scope.endDate}
                onChange={(e) => setScope({ ...scope, endDate: e.target.value })}
                className="glass-input w-full px-3 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security categories */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Security Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const checked = selectedCats.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCat(cat.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 ${
                  checked
                    ? 'border-primary-600/40 bg-primary-600/10'
                    : 'border-base-500 bg-base-700/40 hover:border-base-400'
                }`}
              >
                <div className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all ${
                  checked ? 'border-primary-500 bg-primary-600' : 'border-base-400'
                }`}>
                  {checked && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-xs ${checked ? 'text-primary-300' : 'text-gray-400'}`}>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Authorization */}
      <div className={`glass-card p-5 ${authError ? 'border-error-500/40' : ''}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => { setAuthorized(e.target.checked); setAuthError(false); }}
            className="mt-0.5 w-4 h-4 rounded border-base-500 bg-base-700 text-primary-600 focus:ring-primary-500/30"
          />
          <span className="text-sm text-gray-300">
            I confirm that I am authorized to assess this application and that testing will only be performed on authorized environments and synthetic/demo data.
          </span>
        </label>
        {authError && (
          <p className="text-xs text-error-400 mt-2 ml-7">Authorization confirmation is required to start the assessment.</p>
        )}
      </div>

      {/* Action button */}
      <div className="flex items-center gap-4">
        <button
          onClick={startAssessment}
          disabled={running}
          className="btn-primary px-6 py-3 flex items-center gap-2 text-sm disabled:opacity-60"
        >
          {running ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Assessment Running...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Authorized Assessment
            </>
          )}
        </button>
        <span className="text-xs text-gray-500">
          {selectedCats.size} categories selected
        </span>
      </div>

      {/* Results */}
      {results && (
        <div className="glass-card p-6 animate-slide-up border-success-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-success-500/15">
              <Check className="w-5 h-5 text-success-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Assessment Completed</h3>
              <p className="text-xs text-gray-500">Synthetic analysis on {assessmentTypes.find((at) => at.id === type)?.label}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-base-700/40">
              <p className="text-2xl font-bold text-error-400">2</p>
              <p className="text-[10px] text-gray-500">Critical</p>
            </div>
            <div className="p-3 rounded-xl bg-base-700/40">
              <p className="text-2xl font-bold text-orange-400">3</p>
              <p className="text-[10px] text-gray-500">High</p>
            </div>
            <div className="p-3 rounded-xl bg-base-700/40">
              <p className="text-2xl font-bold text-warning-400">5</p>
              <p className="text-[10px] text-gray-500">Medium</p>
            </div>
            <div className="p-3 rounded-xl bg-base-700/40">
              <p className="text-2xl font-bold text-success-400">4</p>
              <p className="text-[10px] text-gray-500">Low</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            AI analysis complete. 14 findings across {selectedCats.size} categories. Navigate to Vulnerabilities to view details.
          </p>
        </div>
      )}
    </div>
  );
}
