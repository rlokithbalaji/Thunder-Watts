import { useState } from 'react';
import {
  Shield, LayoutDashboard, Server, ScanSearch, Bug, Bot, FileText, Network, KeyRound,
  LogOut, ChevronLeft, LockKeyhole, Globe, Radio, BellRing, FileBarChart, Scale,
  ShieldCheck, Database, ScrollText, Users, Settings as SettingsIcon, Menu, X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface SidebarProps {
  current: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: typeof Shield;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'applications', label: 'Applications', icon: Server, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'assessment', label: 'Assessments', icon: ScanSearch, roles: ['admin', 'analyst'] },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'ai-analyzer', label: 'AI Security', icon: Bot, roles: ['admin', 'analyst'] },
  { id: 'live-monitor', label: 'Live Monitor', icon: Radio, roles: ['admin', 'analyst'] },
  { id: 'api-security', label: 'API Security', icon: Network, roles: ['admin', 'analyst'] },
  { id: 'auth-security', label: 'Authentication', icon: KeyRound, roles: ['admin', 'analyst'] },
  { id: 'access-control', label: 'Authorization', icon: LockKeyhole, roles: ['admin', 'analyst'] },
  { id: 'client-security', label: 'Client-Side Security', icon: ShieldCheck, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'comm-security', label: 'Communication Security', icon: Globe, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'data-protection', label: 'Data Protection', icon: Database, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'report-generator', label: 'Reports', icon: FileBarChart, roles: ['admin', 'analyst'] },
  { id: 'alerts', label: 'Alerts', icon: BellRing, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'audit-trail', label: 'Audit Logs', icon: ScrollText, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'compliance', label: 'Compliance', icon: Scale, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'users', label: 'Users', icon: Users, roles: ['admin'] },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, roles: ['admin', 'analyst', 'viewer'] },
];

const roleLabels: Record<UserRole, string> = {
  admin: 'Security Administrator',
  analyst: 'Security Analyst',
  viewer: 'Viewer',
};

// Mobile bottom nav items (subset)
const mobileNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'vulnerabilities', label: 'Vulns', icon: Bug, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'alerts', label: 'Alerts', icon: BellRing, roles: ['admin', 'analyst', 'viewer'] },
  { id: 'live-monitor', label: 'Live', icon: Radio, roles: ['admin', 'analyst'] },
  { id: 'assessment', label: 'Assess', icon: ScanSearch, roles: ['admin', 'analyst'] },
];

export function Sidebar({ current, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const visibleItems = navItems.filter((item) => item.roles.includes(user.role));
  const visibleMobileItems = mobileNavItems.filter((item) => item.roles.includes(user.role));

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-base-800/90 backdrop-blur-xl border-b border-base-600/60 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg shadow-primary-600/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">WORLD MONITOR</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl text-gray-400 hover:text-primary-300 hover:bg-base-700/60 transition-all">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-base-800/95 backdrop-blur-xl border-r border-base-600/60 flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-4 py-5 border-b border-base-600/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg shadow-primary-600/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-white text-sm tracking-wide">WORLD MONITOR</h1>
                  <p className="text-[10px] text-primary-400 font-medium">Security Platform</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-base-700/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const active = current === item.id;
                return (
                  <button key={item.id} onClick={() => handleNavigate(item.id)} className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}>
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-base-600/60 p-3">
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-600/20 text-accent-400 text-xs font-semibold">{user.avatar}</div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{roleLabels[user.role]}</p>
                </div>
              </div>
              <button onClick={logout} className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-error-400 hover:bg-error-500/10 transition-all">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } hidden lg:flex shrink-0 bg-base-800/80 backdrop-blur-xl border-r border-base-600/60 flex-col transition-all duration-300 h-screen sticky top-0 z-30`}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-base-600/60">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg shadow-primary-600/30 shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-white text-sm tracking-wide whitespace-nowrap">WORLD MONITOR</h1>
              <p className="text-[10px] text-primary-400 font-medium whitespace-nowrap">Security Platform</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-b border-base-600/60">
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
              </span>
              <span className="text-success-400 font-medium">SYSTEM ONLINE</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">Authorized Security Environment</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id || (current.startsWith('vuln') && item.id === 'vulnerabilities');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link w-full ${active ? 'nav-link-active' : ''} ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-base-600/60 p-3">
          {!collapsed && (
            <div className="mb-3 px-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-600/20 text-accent-400 text-xs font-semibold shrink-0">
                  {user.avatar}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{roleLabels[user.role]}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-error-400 hover:bg-error-500/10 transition-all duration-200 ${collapsed ? 'w-full justify-center' : 'flex-1'}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Logout</span>}
            </button>
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-xl text-gray-400 hover:text-primary-300 hover:bg-base-700/60 transition-all duration-200"
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-base-800/90 backdrop-blur-xl border-t border-base-600/60 flex items-center justify-around px-2 py-2">
        {visibleMobileItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${active ? 'text-primary-300' : 'text-gray-500'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
