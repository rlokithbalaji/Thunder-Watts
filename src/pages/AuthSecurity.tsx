import { KeyRound, LogIn, UserCheck, Lock, ShieldCheck, Activity, AlertTriangle, Lightbulb } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { authMetrics, loginActivity, sessionActivity } from '@/data/mockData';

export function AuthSecurity() {
  const stats = [
    { label: 'Failed Login Attempts', value: authMetrics.failedLogins, icon: LogIn, color: 'text-error-400' },
    { label: 'Successful Logins', value: authMetrics.successfulLogins, icon: UserCheck, color: 'text-success-400' },
    { label: 'Locked Accounts', value: authMetrics.lockedAccounts, icon: Lock, color: 'text-warning-400' },
    { label: 'MFA Enabled', value: authMetrics.mfaEnabled, icon: ShieldCheck, color: 'text-primary-400', suffix: '%' },
    { label: 'Session Anomalies', value: authMetrics.sessionAnomalies, icon: Activity, color: 'text-error-400' },
  ];

  const recommendations = [
    'Enable MFA for privileged accounts to reduce the risk of credential compromise.',
    'Review the 12 locked accounts and verify whether they are legitimate users or attack targets.',
    'Investigate the 5 session anomalies for potential session hijacking or token theft.',
    'Consider implementing adaptive authentication based on risk scoring for login attempts.',
    'Set up alerting for failed login spikes exceeding 20 attempts per minute per IP.',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Authentication Security</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor authentication health, login activity, and session security</p>
      </div>

      {/* Auth health banner */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-600/20">
            <KeyRound className="w-7 h-7 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Authentication Health</h3>
            <p className="text-xs text-gray-500">Overall status: <span className="text-warning-400 font-medium">Moderate — action recommended</span></p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-warning-500/10 border border-warning-500/30">
            <AlertTriangle className="w-4 h-4 text-warning-400" />
            <span className="text-xs text-warning-400 font-medium">2 items need attention</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card glass-card-hover p-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="p-2 rounded-lg bg-base-700/60 inline-block mb-2">
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter value={s.value} suffix={s.suffix || ''} />
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login activity */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Login Activity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={loginActivity}>
              <defs>
                <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="success" stroke="#22c55e" strokeWidth={2} fill="url(#successGrad)" name="Successful" />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fill="url(#failedGrad)" name="Failed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Failed login trend */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Failed Login Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={loginActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' }} />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed Logins" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Session activity */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Session Activity & Anomalies</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={sessionActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval={2} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Line type="monotone" dataKey="active" stroke="#06b6d4" strokeWidth={2} dot={false} name="Active Sessions" />
            <Line type="monotone" dataKey="anomalies" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Anomalies" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-warning-400" />
          <h3 className="text-sm font-semibold text-white">Security Recommendations</h3>
        </div>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-base-700/40 hover:bg-base-700/60 transition-colors">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-warning-500/15 text-warning-400 text-xs font-semibold shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
