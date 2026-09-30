import { useState } from 'react';
import { ShieldCheck, ShieldX, Play, Loader2, UserCog, Lock, ScrollText, Info } from 'lucide-react';
import { authzTestUsers, authzTestResources, authzTestResults } from '@/data/mockData';
import type { AuthzTestResult } from '@/types';

export function AccessControl() {
  const [selectedUser, setSelectedUser] = useState(authzTestUsers[0].name);
  const [selectedResource, setSelectedResource] = useState(authzTestResources[0]);
  const [expectedPermission, setExpectedPermission] = useState<'ALLOW' | 'DENY'>('DENY');
  const [running, setRunning] = useState(false);
  const [currentResult, setCurrentResult] = useState<AuthzTestResult | null>(null);
  const [history, setHistory] = useState<AuthzTestResult[]>(authzTestResults);

  const runTest = () => {
    setRunning(true);
    setCurrentResult(null);
    setTimeout(() => {
      const user = authzTestUsers.find((u) => u.name === selectedUser)!;
      const roleResourceMap: Record<string, Record<string, 'ALLOW' | 'DENY'>> = {
        admin: Object.fromEntries(authzTestResources.map((r) => [r, 'ALLOW' as const])),
        analyst: Object.fromEntries(authzTestResources.map((r) => [r, r.includes('Admin') || r.includes('System') ? 'DENY' as const : 'ALLOW' as const])),
        viewer: Object.fromEntries(authzTestResources.map((r) => [r, r.includes('Viewer') || r.includes('Logs') ? 'ALLOW' as const : 'DENY' as const])),
      };
      const observed = roleResourceMap[user.role][selectedResource] || 'DENY';
      const result: AuthzTestResult = {
        id: `az${Date.now()}`,
        user: selectedUser,
        role: user.role,
        resource: selectedResource,
        expectedPermission,
        observedPermission: observed,
        result: observed === expectedPermission ? 'PASS' : 'FAIL',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev]);
      setRunning(false);
    }, 1500);
  };

  const passCount = history.filter((h) => h.result === 'PASS').length;
  const failCount = history.filter((h) => h.result === 'FAIL').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Access Control Tester</h2>
        <p className="text-sm text-gray-500 mt-1">Simulate authorization checks against role-based access control rules</p>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600/5 border border-primary-600/20">
        <Info className="w-4 h-4 text-primary-400 shrink-0" />
        <span className="text-xs text-primary-400">Simulation-based testing — no live requests are sent. Connect an explicitly authorized test backend to enable live checks.</span>
      </div>

      {/* Test configuration */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">Configure Authorization Test</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Test User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="glass-input w-full px-4 py-2.5 text-sm"
            >
              {authzTestUsers.map((u) => (
                <option key={u.id} value={u.name} className="bg-base-800">{u.name} ({u.role})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Role</label>
            <div className="px-4 py-2.5 rounded-xl bg-base-700/40 border border-base-500 text-sm text-gray-300">
              {authzTestUsers.find((u) => u.name === selectedUser)?.role}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Resource</label>
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="glass-input w-full px-4 py-2.5 text-sm"
            >
              {authzTestResources.map((r) => (
                <option key={r} value={r} className="bg-base-800">{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Expected Permission</label>
            <select
              value={expectedPermission}
              onChange={(e) => setExpectedPermission(e.target.value as 'ALLOW' | 'DENY')}
              className="glass-input w-full px-4 py-2.5 text-sm"
            >
              <option value="DENY" className="bg-base-800">DENY</option>
              <option value="ALLOW" className="bg-base-800">ALLOW</option>
            </select>
          </div>
        </div>
        <button
          onClick={runTest}
          disabled={running}
          className="btn-primary mt-5 px-5 py-2.5 flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {running ? 'Running Test...' : 'Run Authorization Check'}
        </button>
      </div>

      {/* Current result */}
      {currentResult && !running && (
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="text-sm font-semibold text-white mb-4">Authorization Check Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <ResultField label="User" value={currentResult.user} icon={<UserCog className="w-3.5 h-3.5" />} />
            <ResultField label="Role" value={currentResult.role} />
            <ResultField label="Resource" value={currentResult.resource} />
            <ResultField label="Expected" value={currentResult.expectedPermission} />
            <ResultField label="Observed" value={currentResult.observedPermission} />
          </div>
          <div className={`mt-4 flex items-center gap-3 px-5 py-4 rounded-xl ${currentResult.result === 'PASS' ? 'bg-success-500/10 border border-success-500/30' : 'bg-error-500/10 border border-error-500/30'}`}>
            {currentResult.result === 'PASS' ? (
              <ShieldCheck className="w-6 h-6 text-success-400" />
            ) : (
              <ShieldX className="w-6 h-6 text-error-400" />
            )}
            <div>
              <p className={`text-lg font-bold ${currentResult.result === 'PASS' ? 'text-success-400' : 'text-error-400'}`}>
                {currentResult.result}
              </p>
              <p className="text-xs text-gray-500">
                {currentResult.result === 'PASS'
                  ? 'Access control behavior matches the expected permission.'
                  : 'Access control behavior does NOT match the expected permission — investigate immediately.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <ScrollText className="w-5 h-5 text-primary-400" />
            <span className="text-xs text-gray-500">Total Tests</span>
          </div>
          <p className="text-2xl font-bold text-white">{history.length}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-success-400" />
            <span className="text-xs text-gray-500">Passed</span>
          </div>
          <p className="text-2xl font-bold text-success-400">{passCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldX className="w-5 h-5 text-error-400" />
            <span className="text-xs text-gray-500">Failed</span>
          </div>
          <p className="text-2xl font-bold text-error-400">{failCount}</p>
        </div>
      </div>

      {/* Test history */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-base-600/60">
          <h3 className="text-sm font-semibold text-white">Test History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-600/60">
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Expected</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Observed</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r) => (
                <tr key={r.id} className="border-b border-base-700/40 hover:bg-base-700/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{r.timestamp}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{r.user}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{r.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{r.resource}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-semibold ${r.expectedPermission === 'ALLOW' ? 'text-success-400' : 'text-error-400'}`}>
                      {r.expectedPermission}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-semibold ${r.observedPermission === 'ALLOW' ? 'text-success-400' : 'text-error-400'}`}>
                      {r.observedPermission}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${r.result === 'PASS' ? 'bg-success-500/15 text-success-400 border border-success-500/30' : 'bg-error-500/15 text-error-400 border border-error-500/30'}`}>
                      {r.result === 'PASS' ? <ShieldCheck className="w-3 h-3" /> : <ShieldX className="w-3 h-3" />}
                      {r.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResultField({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-base-700/40">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
        {icon}{label}
      </p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
