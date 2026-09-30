import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, Check, Info, AlertTriangle, ShieldCheck, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { notifications } from '@/data/mockData';
import type { UserRole } from '@/types';

interface TopBarProps {
  title: string;
  subtitle: string;
  onNavigate: (page: string) => void;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Security Administrator',
  analyst: 'Security Analyst',
  viewer: 'Viewer',
};

export function TopBar({ title, subtitle, onNavigate }: TopBarProps) {
  const { user, switchRole } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const notifIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-error-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning-400" />;
      case 'success': return <ShieldCheck className="w-4 h-4 text-success-400" />;
      default: return <Info className="w-4 h-4 text-accent-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-base-900/80 backdrop-blur-xl border-b border-base-600/60">
      <div className="flex items-center justify-between px-6 py-3 gap-4">
        {/* Title */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-white truncate">{title}</h2>
          <p className="text-xs text-gray-500 truncate">{subtitle}</p>
        </div>

        {/* Search */}
        <div className="hidden md:flex relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search vulnerabilities, applications, endpoints..."
            className="glass-input w-full pl-10 pr-4 py-2 text-sm"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl text-gray-400 hover:text-primary-300 hover:bg-base-700/60 transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-[9px] font-bold text-white">
                {notifications.length}
              </span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-card shadow-2xl animate-slide-up overflow-hidden">
                <div className="px-4 py-3 border-b border-base-600/60">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-base-700/40 transition-colors border-b border-base-700/40">
                      <div className="mt-0.5 shrink-0">{notifIcon(n.type)}</div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-300 leading-snug">{n.title}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full px-4 py-2.5 text-xs text-primary-400 hover:bg-base-700/40 transition-colors font-medium">
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:bg-base-700/60 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-600/20 text-accent-400 text-xs font-semibold">
                {user.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-white">{user.name}</p>
                <p className="text-[10px] text-gray-500">{roleLabels[user.role]}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-card shadow-2xl animate-slide-up overflow-hidden">
                <div className="px-4 py-3 border-b border-base-600/60">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="px-2 py-2">
                  <p className="px-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Switch Role (Demo)</p>
                  {(['admin', 'analyst', 'viewer'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setProfileOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        user.role === role ? 'text-primary-300 bg-primary-600/10' : 'text-gray-400 hover:bg-base-700/60'
                      }`}
                    >
                      <UserCircle className="w-4 h-4" />
                      {roleLabels[role]}
                      {user.role === role && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
                <div className="border-t border-base-600/60 px-2 py-2">
                  <button
                    onClick={() => { onNavigate('applications'); setProfileOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-base-700/60 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Manage Applications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
