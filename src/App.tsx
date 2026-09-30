import { useState } from 'react';
import { Shield } from 'lucide-react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { AIAssistant } from '@/components/AIAssistant';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Applications } from '@/pages/Applications';
import { Assessment } from '@/pages/Assessment';
import { Vulnerabilities } from '@/pages/Vulnerabilities';
import { AIAnalyzer } from '@/pages/AIAnalyzer';
import { LogAnalyzer } from '@/pages/LogAnalyzer';
import { APISecurity } from '@/pages/APISecurity';
import { AuthSecurity } from '@/pages/AuthSecurity';
import { AccessControl } from '@/pages/AccessControl';
import { ClientSecurity } from '@/pages/ClientSecurity';
import { CommunicationSecurity } from '@/pages/CommunicationSecurity';
import { DataProtection } from '@/pages/DataProtection';
import { LiveMonitor } from '@/pages/LiveMonitor';
import { Alerts } from '@/pages/Alerts';
import { ReportGenerator } from '@/pages/ReportGenerator';
import { Compliance } from '@/pages/Compliance';
import { AuditTrail } from '@/pages/AuditTrail';
import { UserManagement } from '@/pages/UserManagement';
import { Settings } from '@/pages/Settings';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Security Overview', subtitle: 'Real-time monitoring of authorized applications' },
  applications: { title: 'Applications', subtitle: 'Manage and monitor your authorized applications' },
  assessment: { title: 'Security Assessment', subtitle: 'Configure and launch authorized assessments' },
  vulnerabilities: { title: 'Vulnerabilities', subtitle: 'Track and manage security findings' },
  'ai-analyzer': { title: 'AI Vulnerability Analyzer', subtitle: 'AI-powered analysis of security test results' },
  'log-analyzer': { title: 'AI Log Analyzer', subtitle: 'Detect suspicious patterns in log data' },
  'api-security': { title: 'API Security', subtitle: 'Endpoint security and authorization monitoring' },
  'auth-security': { title: 'Authentication Security', subtitle: 'Authentication health and session monitoring' },
  'access-control': { title: 'Access Control Tester', subtitle: 'Simulate and verify authorization checks' },
  'client-security': { title: 'Client-Side Security', subtitle: 'Browser security, headers, cookies, and storage' },
  'comm-security': { title: 'Communication Security', subtitle: 'Transport layer security and TLS configuration' },
  'data-protection': { title: 'Data Protection', subtitle: 'Encryption coverage and PII monitoring' },
  'live-monitor': { title: 'Live Monitor', subtitle: 'Real-time security event stream' },
  alerts: { title: 'Security Alerts', subtitle: 'Track, triage, and resolve security findings' },
  'report-generator': { title: 'AI Security Report Generator', subtitle: 'Generate professional security assessment reports' },
  compliance: { title: 'Compliance & Governance', subtitle: 'Security governance and framework alignment' },
  'audit-trail': { title: 'Audit Trail', subtitle: 'Immutable record of all security-relevant actions' },
  users: { title: 'User Management', subtitle: 'Manage user accounts, roles, and access permissions' },
  settings: { title: 'Settings', subtitle: 'Manage your profile, security, and platform configuration' },
};

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  if (!user) {
    return <Login />;
  }

  const meta = pageMeta[page] || pageMeta.dashboard;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />;
      case 'applications': return <Applications />;
      case 'assessment': return <Assessment />;
      case 'vulnerabilities': return <Vulnerabilities />;
      case 'ai-analyzer': return <AIAnalyzer />;
      case 'log-analyzer': return <LogAnalyzer />;
      case 'api-security': return <APISecurity />;
      case 'auth-security': return <AuthSecurity />;
      case 'access-control': return <AccessControl />;
      case 'client-security': return <ClientSecurity />;
      case 'comm-security': return <CommunicationSecurity />;
      case 'data-protection': return <DataProtection />;
      case 'live-monitor': return <LiveMonitor />;
      case 'alerts': return <Alerts />;
      case 'report-generator': return <ReportGenerator />;
      case 'compliance': return <Compliance />;
      case 'audit-trail': return <AuditTrail />;
      case 'users': return <UserManagement />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        current={page}
        onNavigate={setPage}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onNavigate={setPage}
        />
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto pb-20 lg:pb-6">
          {renderPage()}
        </main>
        {/* Footer */}
        <footer className="border-t border-base-600/60 px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-400" />
              <span className="text-xs text-gray-500">World Monitor &copy; 2026</span>
              <span className="text-gray-600 hidden md:inline">·</span>
              <span className="text-xs text-gray-600 hidden md:inline">Authorized Security Assessment Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
              </span>
              <span className="text-xs text-success-400 font-medium">AI Safe Assessment Mode Enabled</span>
            </div>
          </div>
        </footer>
      </div>
      <AIAssistant />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
