import { ShieldCheck, AlertTriangle, XCircle, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-600/60">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-base-700/40 hover:bg-base-700/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-3 text-sm text-gray-300 ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                  >
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {data.map((row) => (
          <div
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className={`px-4 py-3 rounded-xl bg-base-700/40 ${onRowClick ? 'cursor-pointer' : ''}`}
          >
            {columns.map((col) => {
              if (col.hideOnMobile) return null;
              return (
                <div key={String(col.key)} className="flex items-center justify-between py-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{col.label}</span>
                  <span className="text-sm text-gray-300 text-right">
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusIcon({ status }: { status: string }) {
  const icons: Record<string, { icon: LucideIcon; color: string }> = {
    pass: { icon: ShieldCheck, color: 'text-success-400' },
    warn: { icon: AlertTriangle, color: 'text-warning-400' },
    fail: { icon: XCircle, color: 'text-error-400' },
    secure: { icon: ShieldCheck, color: 'text-success-400' },
    review: { icon: AlertTriangle, color: 'text-warning-400' },
    'at risk': { icon: XCircle, color: 'text-error-400' },
  };
  const cfg = icons[status.toLowerCase()] || { icon: Info, color: 'text-gray-400' };
  const Icon = cfg.icon;
  return <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />;
}
