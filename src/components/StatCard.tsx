import type { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  decimals?: number;
}

export function StatCard({ icon: Icon, label, value, suffix = '', color, decimals = 0 }: StatCardProps) {
  return (
    <div className="glass-card glass-card-hover p-4 animate-slide-up">
      <div className="p-2 rounded-lg bg-base-700/60 inline-block mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-white">
        <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
