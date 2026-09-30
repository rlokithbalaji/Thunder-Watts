import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer,
} from 'recharts';

type ChartType = 'radar' | 'line' | 'area' | 'bar' | 'pie';

interface SecurityChartProps {
  type: ChartType;
  data: Record<string, unknown>[];
  xKey?: string;
  yKeys?: string[];
  height?: number;
}

const COLORS = ['#06b6d4', '#f59e0b', '#ef4444', '#22c55e', '#8b5cf6', '#f97316'];

export function SecurityChart({ type, data, xKey = 'name', yKeys = ['value'], height = 220 }: SecurityChartProps) {
  const tooltipStyle = { background: '#0f1525', border: '1px solid #2a3654', borderRadius: '12px' };

  if (type === 'radar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data}>
          <PolarGrid stroke="#2a3654" />
          <PolarAngleAxis dataKey={xKey} tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 9 }} stroke="#2a3654" />
          <Radar dataKey={yKeys[0]} stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${yKeys[0]}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
          <XAxis dataKey={xKey} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey={yKeys[0]} stroke="#06b6d4" strokeWidth={2} fill={`url(#grad-${yKeys[0]})`} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
          <XAxis dataKey={xKey} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(6,182,212,0.05)' }} />
          {yKeys.map((key, i) => (
            <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey={yKeys[0]} nameKey={xKey} cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // line
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2336" />
        <XAxis dataKey={xKey} tick={{ fill: '#6b7280', fontSize: 10 }} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '11px' }} />
        {yKeys.map((key, i) => (
          <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
