import { useState } from 'react';
import { Bot, Sparkles, Loader2, ShieldCheck, AlertTriangle, Lightbulb, Eye, Activity, Wrench, ClipboardCheck } from 'lucide-react';

interface AnalysisResult {
  vulnerability: string;
  severity: string;
  confidence: number;
  component: string;
  why: string;
  impact: string;
  evidence: string;
  fix: string;
  retest: string;
}

const exampleInput = `HTTP Request:
GET /api/users/42 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNX0...
Host: api-staging.worldmonitor.app

HTTP Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "email": "user42@demo.app",
  "role": "standard",
  "password_hash": "$2a$10$N9qo8uLOickgx2ZMRZoMy...",
  "mfa_secret": "JBSWY3DPEHPK3PXP",
  "api_key": "sk-live-9f8a2b7c4d1e6f3a"
}`;

function analyzeInput(input: string): AnalysisResult {
  const lower = input.toLowerCase();

  if (lower.includes('password_hash') || lower.includes('mfa_secret') || lower.includes('api_key') || lower.includes('sensitive')) {
    return {
      vulnerability: 'Sensitive Data Exposure',
      severity: 'High',
      confidence: 94,
      component: 'API Response Serialization',
      why: 'The API response includes sensitive fields (password_hash, mfa_secret, api_key) that should never be exposed to any client. These fields can be used for offline attacks and MFA bypass.',
      impact: 'Exposure of password hashes enables offline brute-force attacks. The MFA secret allows attackers to bypass multi-factor authentication. The API key provides direct access to the service.',
      evidence: 'Response body contains: password_hash, mfa_secret, api_key fields. These are credential-related fields that must be excluded from all API responses.',
      fix: 'Implement response serialization with explicit field allowlists (DTOs). Never expose credential-related fields. Use a serialization layer that only includes safe, non-sensitive fields (name, email, role, created_at). Add automated tests verifying sensitive fields are excluded.',
      retest: 'After implementing the fix, send the same API request and verify the response no longer contains password_hash, mfa_secret, or api_key fields. Confirm only allowlisted fields are present.',
    };
  }

  if (lower.includes('admin') && (lower.includes('403') === false) && (lower.includes('200') || lower.includes('authorized'))) {
    return {
      vulnerability: 'Broken Access Control',
      severity: 'High',
      confidence: 91,
      component: 'API Authorization Middleware',
      why: 'The admin endpoint does not enforce server-side authorization checks. A non-admin user can access admin-only resources.',
      impact: 'An attacker with any valid account could access administrative functions, view all user accounts, and potentially modify user roles, leading to privilege escalation.',
      evidence: 'Request to admin endpoint returned HTTP 200 with full data instead of HTTP 403 Forbidden. This indicates missing or ineffective authorization checks.',
      fix: 'Implement server-side RBAC middleware that verifies the user role before processing admin requests. Apply role checks at both the API gateway and controller level.',
      retest: 'Authenticate as a non-admin user and request the admin endpoint. Verify the server returns HTTP 403 Forbidden.',
    };
  }

  if (lower.includes('<script>') || lower.includes('onerror') || lower.includes('xss') || lower.includes('alert')) {
    return {
      vulnerability: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      confidence: 88,
      component: 'Input Validation / Output Encoding',
      why: 'User input is reflected in the response without proper output encoding, allowing script execution in the victim browser.',
      impact: 'An attacker can craft a malicious URL that executes JavaScript in the victim browser, potentially stealing session tokens or performing actions on behalf of the user.',
      evidence: 'Script tags or event handlers in user input were reflected unencoded in the HTML response and executed by the browser.',
      fix: 'Apply context-aware output encoding for all user input reflected in HTML. Use a modern templating engine with auto-escaping. Implement Content-Security-Policy as defense-in-depth.',
      retest: 'Submit the same malicious input and verify the output is properly encoded. Check that no script tags or event handlers are executed.',
    };
  }

  return {
    vulnerability: 'Potential Security Misconfiguration',
    severity: 'Medium',
    confidence: 76,
    component: 'General Configuration',
    why: 'The provided input shows patterns that may indicate a security misconfiguration or missing validation. Further investigation is recommended.',
    impact: 'Security misconfigurations can expose sensitive information, allow unauthorized access, or create attack surfaces that could be exploited.',
    evidence: 'Pattern analysis of the provided input flagged potential issues. Manual review recommended to confirm the exact nature of the finding.',
    fix: 'Review the configuration and validate all inputs. Ensure security headers, access controls, and input validation are properly configured. Refer to OWASP guidelines for the specific component.',
    retest: 'After applying fixes, re-run the same test scenario and verify the identified patterns are no longer present.',
  };
}

export function AIAnalyzer() {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const runAnalysis = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeInput(input));
      setAnalyzing(false);
    }, 1800);
  };

  const loadExample = () => setInput(exampleInput);

  const sevClass = (sev: string) => `severity-${sev.toLowerCase()}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Vulnerability Analyzer</h2>
        <p className="text-sm text-gray-500 mt-1">Paste security test results, API responses, or logs for AI-powered analysis</p>
      </div>

      {/* Safe mode badge */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-600/5 border border-primary-600/20">
        <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
        <span className="text-xs text-primary-400 font-medium">AI operates in Safe Assessment Mode — analysis only, no exploitation</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Input Data</h3>
            <button onClick={loadExample} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
              Load Example
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste security test result, API response, log, or finding here..."
            className="glass-input w-full flex-1 px-4 py-3 text-sm font-mono resize-none min-h-[300px]"
          />
          <button
            onClick={runAnalysis}
            disabled={!input.trim() || analyzing}
            className="btn-primary mt-4 px-6 py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze with AI
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">AI Analysis Result</h3>

          {!result && !analyzing && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="p-4 rounded-2xl bg-base-700/40 mb-3">
                <Bot className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500">Analysis results will appear here</p>
              <p className="text-xs text-gray-600 mt-1">Paste data and click "Analyze with AI"</p>
            </div>
          )}

          {analyzing && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="w-10 h-10 text-primary-400 animate-spin mb-3" />
              <p className="text-sm text-gray-400">AI is analyzing your input...</p>
              <p className="text-xs text-gray-600 mt-1">Detecting patterns and vulnerabilities</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="space-y-4 animate-slide-up">
              {/* Top result card */}
              <div className="p-4 rounded-xl bg-base-700/40 border border-base-600/60">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-primary-600/15">
                    <AlertTriangle className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-xs font-semibold text-primary-400">AI Analysis</span>
                </div>

                <ResultField icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Potential Vulnerability" value={result.vulnerability} highlight />
                <div className="flex items-center gap-3 mt-3">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${sevClass(result.severity)}`}>
                    {result.severity}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 h-1.5 rounded-full bg-base-600 overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${result.confidence}%` }} />
                    </div>
                    <span className="text-xs text-gray-400">{result.confidence}%</span>
                  </div>
                </div>
              </div>

              <ResultField icon={<Activity className="w-3.5 h-3.5" />} label="Affected Component" value={result.component} />
              <ResultField icon={<Lightbulb className="w-3.5 h-3.5" />} label="Why This Matters" value={result.why} />
              <ResultField icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Potential Impact" value={result.impact} />
              <ResultField icon={<Eye className="w-3.5 h-3.5" />} label="Evidence" value={result.evidence} />
              <ResultField icon={<Wrench className="w-3.5 h-3.5" />} label="Recommended Fix" value={result.fix} />
              <ResultField icon={<ClipboardCheck className="w-3.5 h-3.5" />} label="Retest Procedure" value={result.retest} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultField({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-gray-500 mb-1">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-sm leading-relaxed ${highlight ? 'text-white font-semibold text-base' : 'text-gray-300'}`}>
        {value}
      </p>
    </div>
  );
}
