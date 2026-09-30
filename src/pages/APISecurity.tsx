import { useState } from 'react';
import { Network, ShieldCheck, Sparkles, Loader2, Bot, Globe, Lock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { endpoints } from '@/data/mockData';
import type { Endpoint, RiskLevel } from '@/types';

const apiStats = {
  total: 128,
  authenticated: 103,
  public: 25,
  issues: 7,
};

const exampleRequest = `GET /api/users/42 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNX0...
Content-Type: application/json
Host: api-staging.worldmonitor.app

Response:
HTTP/1.1 200 OK
{
  "id": 42,
  "email": "user42@demo.app",
  "password_hash": "$2a$10$N9qo8uLOickgx2ZMRZoMy...",
  "role": "standard"
}`;

interface APIAnalysis {
  finding: string;
  severity: string;
  recommendation: string;
}

function analyzeAPI(input: string): APIAnalysis {
  const lower = input.toLowerCase();
  if (lower.includes('password_hash') || lower.includes('mfa_secret') || lower.includes('api_key')) {
    return {
      finding: 'Sensitive Data Exposure in API Response',
      severity: 'High',
      recommendation: 'Remove sensitive fields (password_hash, mfa_secret, api_key) from the API response. Use field allowlists in the serialization layer to ensure only safe fields are returned.',
    };
  }
  if (lower.includes('403') || lower.includes('unauthorized') || lower.includes('forbidden')) {
    return {
      finding: 'Authorization Properly Enforced',
      severity: 'Informational',
      recommendation: 'The endpoint correctly returns 403 for unauthorized requests. Authorization controls are functioning as expected.',
    };
  }
  return {
    finding: 'Input Validation Recommended',
    severity: 'Medium',
    recommendation: 'Ensure all input parameters are validated server-side. Implement schema validation for request bodies and query parameters.',
  };
}

export function APISecurity() {
  const [apiInput, setApiInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<APIAnalysis | null>(null);

  const runAnalysis = () => {
    if (!apiInput.trim()) return;
    setAnalyzing(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis(analyzeAPI(apiInput));
      setAnalyzing(false);
    }, 1500);
  };

  const loadExample = () => setApiInput(exampleRequest);

  const methodClass = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-accent-500/15 text-accent-400';
      case 'POST': return 'bg-success-500/15 text-success-400';
      case 'PUT': return 'bg-warning-500/15 text-warning-400';
      case 'DELETE': return 'bg-error-500/15 text-error-400';
      case 'PATCH': return 'bg-primary-500/15 text-primary-400';
      default: return 'bg-gray-500/15 text-gray-400';
    }
  };

  const riskClass = (risk: RiskLevel) => `severity-${risk.toLowerCase()}`;
  const statusIcon = (status: string) => {
    if (status === 'Secure') return <CheckCircle className="w-3.5 h-3.5 text-success-400" />;
    if (status === 'Review') return <AlertTriangle className="w-3.5 h-3.5 text-warning-400" />;
    return <XCircle className="w-3.5 h-3.5 text-error-400" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">API Security</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor endpoint security, authentication, and authorization</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Network className="w-5 h-5 text-primary-400" />} label="Total Endpoints" value={apiStats.total} />
        <StatCard icon={<Lock className="w-5 h-5 text-success-400" />} label="Authenticated" value={apiStats.authenticated} />
        <StatCard icon={<Globe className="w-5 h-5 text-accent-400" />} label="Public" value={apiStats.public} />
        <StatCard icon={<AlertTriangle className="w-5 h-5 text-error-400" />} label="Potential Issues" value={apiStats.issues} />
      </div>

      {/* Endpoint table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-base-600/60">
          <h3 className="text-sm font-semibold text-white">Endpoint Security Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-600/60">
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Authentication</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Authorization</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((ep: Endpoint) => (
                <tr key={ep.id} className="border-b border-base-700/40 hover:bg-base-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-gray-300">{ep.path}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${methodClass(ep.method)}`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{ep.auth}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">{ep.authorization}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${riskClass(ep.risk)}`}>
                      {ep.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(ep.status)}
                      <span className="text-xs text-gray-400">{ep.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Analysis section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">AI Request/Response Analyzer</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-600/5 border border-primary-600/20 mb-4">
          <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
          <span className="text-[10px] text-primary-400">Paste a sanitized request/response for AI analysis</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-400">Sanitized Request/Response</label>
              <button onClick={loadExample} className="text-xs text-primary-400 hover:text-primary-300">Load Example</button>
            </div>
            <textarea
              value={apiInput}
              onChange={(e) => setApiInput(e.target.value)}
              placeholder="Paste sanitized HTTP request/response here..."
              className="glass-input w-full px-4 py-3 text-sm font-mono resize-none min-h-[200px]"
            />
            <button
              onClick={runAnalysis}
              disabled={!apiInput.trim() || analyzing}
              className="btn-primary mt-3 px-5 py-2.5 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">AI Analysis</label>
            <div className="min-h-[200px]">
              {!analysis && !analyzing && (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <Bot className="w-8 h-8 text-gray-600 mb-2" />
                  <p className="text-xs text-gray-500">Analysis results will appear here</p>
                </div>
              )}
              {analyzing && (
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <Loader2 className="w-8 h-8 text-primary-400 animate-spin mb-2" />
                  <p className="text-xs text-gray-400">Analyzing...</p>
                </div>
              )}
              {analysis && !analyzing && (
                <div className="space-y-3 animate-slide-up">
                  <div className="p-3 rounded-xl bg-base-700/40 border border-base-600/60">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold severity-${analysis.severity.toLowerCase()}`}>
                        {analysis.severity}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">{analysis.finding}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-base-700/40">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Recommendation</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{analysis.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass-card glass-card-hover p-4">
      <div className="p-2 rounded-lg bg-base-700/60 inline-block mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
