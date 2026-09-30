import { useState } from 'react';
import { FileText, Sparkles, Loader2, ShieldCheck, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { logEntries as demoLogs } from '@/data/mockData';
import type { LogEntry } from '@/types';

const exampleLogs = `14:32:01 ERROR Auth: Failed login attempt for admin@demo (5/5)
14:31:58 WARN  Auth: Failed login attempt for admin@demo (4/5)
14:31:55 WARN  Auth: Failed login attempt for admin@demo (3/5)
14:31:52 INFO  Auth: Failed login attempt for admin@demo (2/5)
14:31:49 INFO  Auth: Failed login attempt for admin@demo (1/5)
14:28:30 INFO  API: GET /api/users 200 — 45ms
14:27:15 CRIT Auth: Account locked: admin@demo — brute force detected
14:24:10 WARN  API: Unusual request pattern: 150 req/min from 10.0.0.42
14:23:05 ERROR API: GET /api/admin/users 403 — Unauthorized access attempt
14:18:45 ERROR Auth: Token validation failed — expired JWT presented`;

interface LogAnalysis {
  normal: number;
  suspicious: number;
  security: number;
  issues: { title: string; detail: string; severity: string }[];
  explanation: string;
  timeline: { time: string; event: string; type: string }[];
}

function analyzeLogs(input: string): LogAnalysis {
  const lines = input.split('\n').filter((l) => l.trim());
  let normal = 0, suspicious = 0, security = 0;
  const issues: LogAnalysis['issues'] = [];
  const timeline: LogAnalysis['timeline'] = [];

  let failedLoginCount = 0;
  let hasBruteForce = false;
  let hasRateAnomaly = false;
  let hasAuthzFailure = false;

  for (const line of lines) {
    const lower = line.toLowerCase();
    const time = line.substring(0, 8).trim() || 'N/A';

    if (lower.includes('crit') || lower.includes('locked') || lower.includes('brute')) {
      security++;
      hasBruteForce = true;
      timeline.push({ time, event: line.substring(9).trim(), type: 'security' });
    } else if (lower.includes('error') && (lower.includes('403') || lower.includes('unauthorized') || lower.includes('token'))) {
      security++;
      hasAuthzFailure = true;
      timeline.push({ time, event: line.substring(9).trim(), type: 'security' });
    } else if (lower.includes('failed login')) {
      failedLoginCount++;
      if (failedLoginCount > 2) {
        suspicious++;
        timeline.push({ time, event: line.substring(9).trim(), type: 'suspicious' });
      } else {
        normal++;
        timeline.push({ time, event: line.substring(9).trim(), type: 'normal' });
      }
    } else if (lower.includes('unusual') || lower.includes('rate') || lower.includes('warn')) {
      suspicious++;
      hasRateAnomaly = true;
      timeline.push({ time, event: line.substring(9).trim(), type: 'suspicious' });
    } else {
      normal++;
      timeline.push({ time, event: line.substring(9).trim(), type: 'normal' });
    }
  }

  if (hasBruteForce) {
    issues.push({
      title: 'Brute Force Attack Detected',
      detail: `${failedLoginCount} consecutive failed login attempts followed by account lockout. This pattern indicates a brute-force attack against the authentication service. The account was correctly locked after reaching the threshold.`,
      severity: 'Critical',
    });
  }

  if (hasRateAnomaly) {
    issues.push({
      title: 'Unusual Request Rate',
      detail: 'A high volume of requests was detected from a single IP address, exceeding normal traffic patterns. This could indicate scanning, enumeration, or denial-of-service preparation.',
      severity: 'High',
    });
  }

  if (hasAuthzFailure) {
    issues.push({
      title: 'Authorization Failure Attempts',
      detail: 'Unauthorized access attempts to admin endpoints were detected. Combined with the expired JWT presentation, this suggests an attacker is trying to escalate privileges or access protected resources.',
      severity: 'High',
    });
  }

  if (issues.length === 0) {
    issues.push({
      title: 'No Critical Issues Found',
      detail: 'The analyzed logs do not show patterns consistent with active attacks. Continue monitoring for changes in traffic patterns.',
      severity: 'Informational',
    });
  }

  const explanation = `Analysis of ${lines.length} log entries identified ${security} security events, ${suspicious} suspicious activities, and ${normal} normal operations. ${hasBruteForce ? 'A brute-force attack was detected and the system correctly responded with account lockout. ' : ''}${hasRateAnomaly ? 'An abnormal request rate was observed, suggesting potential scanning activity. ' : ''}${hasAuthzFailure ? 'Authorization failures indicate possible privilege escalation attempts. ' : ''}Recommendation: Review the affected IP addresses, verify lockout policies, and consider implementing additional rate limiting on authentication endpoints.`;

  return { normal, suspicious, security, issues, explanation, timeline };
}

export function LogAnalyzer() {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<LogAnalysis | null>(null);

  const runAnalysis = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeLogs(input));
      setAnalyzing(false);
    }, 1800);
  };

  const loadDemo = () => {
    setInput(exampleLogs);
  };

  const loadFromSystem = () => {
    setInput(demoLogs.map((l) => `${l.timestamp} ${l.level.padEnd(8)} ${l.source}: ${l.message}`).join('\n'));
  };

  const typeStyle = (type: string) => {
    switch (type) {
      case 'security': return { dot: 'bg-error-500', text: 'text-error-400', bg: 'bg-error-500/5' };
      case 'suspicious': return { dot: 'bg-warning-500', text: 'text-warning-400', bg: 'bg-warning-500/5' };
      default: return { dot: 'bg-success-500', text: 'text-success-400', bg: 'bg-success-500/5' };
    }
  };

  const sevClass = (sev: string) => `severity-${sev.toLowerCase()}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Log Analyzer</h2>
        <p className="text-sm text-gray-500 mt-1">Analyze logs for authentication failures, suspicious patterns, and security issues</p>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-600/5 border border-primary-600/20">
        <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
        <span className="text-xs text-primary-400 font-medium">AI operates in Safe Assessment Mode — log analysis only, no active probing</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Log Input</h3>
            <div className="flex gap-3">
              <button onClick={loadFromSystem} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                Load System Logs
              </button>
              <button onClick={loadDemo} className="text-xs text-accent-400 hover:text-accent-300 transition-colors">
                Load Example
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste log entries here. Each line should represent one log event..."
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
                Analyzing Logs...
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
          <h3 className="text-sm font-semibold text-white mb-4">Analysis Results</h3>

          {!result && !analyzing && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="p-4 rounded-2xl bg-base-700/40 mb-3">
                <FileText className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500">Log analysis will appear here</p>
            </div>
          )}

          {analyzing && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="w-10 h-10 text-primary-400 animate-spin mb-3" />
              <p className="text-sm text-gray-400">Analyzing log patterns...</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="space-y-5 animate-slide-up">
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard icon={<CheckCircle className="w-5 h-5 text-success-400" />} count={result.normal} label="Normal" color="text-success-400" />
                <StatCard icon={<AlertTriangle className="w-5 h-5 text-warning-400" />} count={result.suspicious} label="Suspicious" color="text-warning-400" />
                <StatCard icon={<XCircle className="w-5 h-5 text-error-400" />} count={result.security} label="Security" color="text-error-400" />
              </div>

              {/* Potential issues */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Potential Security Issues</h4>
                <div className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${issue.severity === 'Informational' ? 'border-accent-500/20 bg-accent-500/5' : 'border-base-600/60 bg-base-700/40'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${sevClass(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className="text-sm font-semibold text-white">{issue.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{issue.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Explanation */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  AI Explanation
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">{result.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      {result && !analyzing && (
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Event Timeline</h3>
          <div className="space-y-1">
            {result.timeline.map((event, i) => {
              const style = typeStyle(event.type);
              return (
                <div key={i} className={`flex items-start gap-3 px-4 py-2.5 rounded-lg ${style.bg} transition-colors`}>
                  <div className={`w-2 h-2 rounded-full ${style.dot} mt-1.5 shrink-0`} />
                  <span className="text-xs font-mono text-gray-500 shrink-0 w-16">{event.time}</span>
                  <span className={`text-xs ${style.text} flex-1`}>{event.event}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, count, label, color }: { icon: React.ReactNode; count: number; label: string; color: string }) {
  return (
    <div className="p-3 rounded-xl bg-base-700/40 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className={`text-2xl font-bold ${color}`}>{count}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}
