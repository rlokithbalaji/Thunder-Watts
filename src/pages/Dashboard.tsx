import { Server, ScanSearch, Bug, AlertTriangle, ShieldCheck, Activity, LogIn, Bot, Plus, Radio, FileBarChart } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  Area, AreaChart,
} from 'recharts';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import {
  dashboardMetrics, securityCategories, securityTrend,
  vulnerabilities,
} from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface MetricCard {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const metricCards: MetricCard[] = [
  { label: 'Total Applications', value: dashboardMetrics.totalApplications, icon: Server, color: 'text-accent-400' },
  { label: 'Active Assessments', value: dashboardMetrics.activeAssessments, icon: ScanSearch, color: 'text-primary-400' },
  { label: 'Open Vulnerabilities', value: dashboardMetrics.openVulnerabilities, icon: Bug, color: 'text-warning-400' },
  { label: 'Critical Findings', value: dashboardMetrics.criticalFindings, icon: AlertTriangle, color: 'text-error-400' },
  { label: 'Security Score', value: dashboardMetrics.securityScore, icon: ShieldCheck, color: 'text-success-400', suffix: '%' },
  { label: 'API Requests', value: dashboardMetrics.apiRequests, icon: Activity, color: 'text-primary-400', suffix: '' },
  { label: 'Failed Logins', value: dashboardMetrics.failedLogins, icon: LogIn, color: 'text-error-400' },
  { label: 'AI Alerts', value: dashboardMetrics.aiAlerts, icon: Bot, color: 'text-accent-400' },
];

const scoreColor = (score: number) => {
  if (score >= 85) return '#22c55e';
  if (score >= 70) return '#06b6d4';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const score = dashboardMetrics.securityScore;
  const recentVulns = vulnerabilities.slice(0, 5);

  const quickActions = [
    { label: 'New Assessment', icon: Plus, page: 'assessment', color: 'text-primary-400' },
    { label: 'AI Analyze', icon: Bot, page: 'ai-analyzer', color: 'text-accent-400' },
    { label: 'Generate Report', icon: FileBarChart, page: 'report-generator', color: 'text-success-400' },
    { label: 'View Vulnerabilities', icon: Bug, page: 'vulnerabilities', color: 'text-warning-400' },
    { label: 'Live Monitor', icon: Radio, page: 'live-monitor', color: 'text-error-400' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Security Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time monitoring of authorized applications</p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onNavigate(action.page)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card glass-card-hover text-sm font-medium text-gray-300 transition-all duration-200"
            >
              <Icon className={`w-4 h-4 ${action.color}`} />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="glass-card glass-card-hover p-4 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-base-700/60`}>
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter
                  value={m.value}
                  suffix={m.suffix || ''}
                  decimals={m.decimals || 0}
                />
              </p>
              <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Security Score + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Score */}
        <div className="glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-white mb-4">Security Score</h3>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#1a2336" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="44" fill="none"
                stroke={scoreColor(score)}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - score / 100)}`}
                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white">{score}</span>
              <span className="text-xs text-gray-500">out of 100</span>
            </div>
          </div>
          <div className="mt-4 px-4 py-1.5 rounded-full" style={{ background: `${scoreColor(score)}15`, border: `1px solid ${scoreColor(score)}30` }}>
            <span className="text-xs font-medium" style={{ color: scoreColor(score) }}>
              {score >= 85 ? 'Excellent Security Posture' : score >= 70 ? 'Good Security Posture' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Security Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={securityCategories}>
              <PolarGrid stroke="#2a3654" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 9 }} stroke="#2a3654" />
              <Radar
                dataKey="score"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  background: '#0f1525',
                  border: '1px solid #2a3654',
                  borderRadius: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {securityCategories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-base-700/40">
                <span className="text-[10px] text-gray-400">{cat.name}</span>
                <span className="text-xs font-semibold" style={{ color: scoreColor(cat.score) }}>{cat.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Score Trend */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Security Score — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={securityTrend}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval={2} />
              <YAxis domain={[60, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} fill="url(#scoreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vulnerabilities Over Time */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Vulnerabilities Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={securityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={false} name="Critical" />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} dot={false} name="High" />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} dot={false} name="Medium" />
              <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} dot={false} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent vulnerabilities */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Recent Vulnerabilities</h3>
        </div>
        <div className="space-y-2">
          {recentVulns.map((v) => (
            <div key={v.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-700/40 hover:bg-base-700/60 transition-colors">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold severity-${v.severity.toLowerCase()}`}>
                {v.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 truncate">{v.title}</p>
                <p className="text-[10px] text-gray-500">{v.id} · {v.component}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{v.status}</p>
                <p className="text-[10px] text-gray-600">AI: {v.aiConfidence}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
