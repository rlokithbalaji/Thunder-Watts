import { useState } from 'react';
import { User, Shield, Bell, Bot, ScanSearch, Palette, Check } from 'lucide-react';
import { defaultSettings } from '@/data/mockData';
import type { AppSettings } from '@/types';

type Tab = 'profile' | 'security' | 'notifications' | 'ai' | 'assessment' | 'appearance';

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Configuration', icon: Bot },
  { id: 'assessment', label: 'Assessment Settings', icon: ScanSearch },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const aiSettingsConfig = [
  { key: 'aiAnalysis', label: 'AI Analysis', desc: 'Enable AI-powered security analysis of findings and logs' },
  { key: 'safeAssessmentMode', label: 'Safe Assessment Mode', desc: 'Restrict AI to analysis only — never execute attacks' },
  { key: 'automaticRemediation', label: 'Automatic Remediation', desc: 'Allow AI to automatically apply fixes (requires authorization)' },
  { key: 'externalActions', label: 'External Actions', desc: 'Allow AI to interact with external systems and APIs' },
  { key: 'requireAuthorization', label: 'Require Authorization', desc: 'Require explicit authorization before any assessment action' },
] as const;

export function Settings() {
  const [tab, setTab] = useState<Tab>('profile');
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const updateAI = (key: keyof AppSettings['ai'], value: boolean) => {
    setSettings((prev) => ({ ...prev, ai: { ...prev.ai, [key]: value } }));
  };

  const updateNotifications = (key: keyof AppSettings['notifications'], value: boolean) => {
    setSettings((prev) => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }));
  };

  const updateProfile = (key: keyof AppSettings['profile'], value: string) => {
    setSettings((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your profile, security, and platform configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-card p-2 space-y-1 lg:sticky lg:top-20">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-primary-600/10 text-primary-300 border border-primary-600/30' : 'text-gray-400 hover:bg-base-700/60 border border-transparent'}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            {tab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white mb-4">Profile Settings</h3>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Full Name</label>
                  <input type="text" value={settings.profile.name} onChange={(e) => updateProfile('name', e.target.value)} className="glass-input w-full px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Email Address</label>
                  <input type="email" value={settings.profile.email} onChange={(e) => updateProfile('email', e.target.value)} className="glass-input w-full px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Bio</label>
                  <textarea value={settings.profile.bio} onChange={(e) => updateProfile('bio', e.target.value)} rows={3} className="glass-input w-full px-4 py-2.5 text-sm resize-none" />
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white mb-4">Security Settings</h3>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-700/40">
                  <div>
                    <p className="text-sm text-gray-200">Multi-Factor Authentication</p>
                    <p className="text-xs text-gray-500 mt-0.5">Require MFA for all logins</p>
                  </div>
                  <Toggle on={settings.security.mfaEnabled} onClick={() => setSettings((prev) => ({ ...prev, security: { ...prev.security, mfaEnabled: !prev.security.mfaEnabled } }))} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Session Timeout (minutes)</label>
                  <input type="number" value={settings.security.sessionTimeout} onChange={(e) => setSettings((prev) => ({ ...prev, security: { ...prev.security, sessionTimeout: Number(e.target.value) } }))} className="glass-input w-full px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Password Expiry (days)</label>
                  <input type="number" value={settings.security.passwordExpiry} onChange={(e) => setSettings((prev) => ({ ...prev, security: { ...prev.security, passwordExpiry: Number(e.target.value) } }))} className="glass-input w-full px-4 py-2.5 text-sm" />
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white mb-4">Notification Preferences</h3>
                {[
                  { key: 'criticalAlerts' as const, label: 'Critical Alerts', desc: 'Immediate notification for critical security findings' },
                  { key: 'weeklyReport' as const, label: 'Weekly Report', desc: 'Receive a weekly security summary via email' },
                  { key: 'anomalyDetection' as const, label: 'Anomaly Detection', desc: 'Alert when AI detects unusual patterns' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-700/40">
                    <div>
                      <p className="text-sm text-gray-200">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle on={settings.notifications[item.key]} onClick={() => updateNotifications(item.key, !settings.notifications[item.key])} />
                  </div>
                ))}
              </div>
            )}

            {tab === 'ai' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-primary-400" />
                  <h3 className="text-sm font-semibold text-white">AI Configuration</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-600/5 border border-primary-600/20 mb-4">
                  <Shield className="w-4 h-4 text-primary-400 shrink-0" />
                  <span className="text-[10px] text-primary-400">Safe Assessment Mode is enforced — AI will never execute attacks or access external systems without explicit authorization.</span>
                </div>
                {aiSettingsConfig.map((item) => (
                  <div key={item.key} className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-700/40">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm text-gray-200">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle on={settings.ai[item.key]} onClick={() => updateAI(item.key, !settings.ai[item.key])} />
                  </div>
                ))}
              </div>
            )}

            {tab === 'assessment' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white mb-4">Assessment Settings</h3>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Default Assessment Scope</label>
                  <select value={settings.assessment.defaultScope} onChange={(e) => setSettings((prev) => ({ ...prev, assessment: { ...prev.assessment, defaultScope: e.target.value } }))} className="glass-input w-full px-4 py-2.5 text-sm">
                    <option value="Production-like Demo" className="bg-base-800">Production-like Demo</option>
                    <option value="Staging" className="bg-base-800">Staging</option>
                    <option value="Test Environment" className="bg-base-800">Test Environment</option>
                  </select>
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-700/40">
                  <div>
                    <p className="text-sm text-gray-200">Automatic Retest</p>
                    <p className="text-xs text-gray-500 mt-0.5">Automatically retest resolved vulnerabilities after 7 days</p>
                  </div>
                  <Toggle on={settings.assessment.autoRetest} onClick={() => setSettings((prev) => ({ ...prev, assessment: { ...prev.assessment, autoRetest: !prev.assessment.autoRetest } }))} />
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-700/40">
                  <div>
                    <p className="text-sm text-gray-200">Evidence Capture</p>
                    <p className="text-xs text-gray-500 mt-0.5">Automatically capture evidence during assessments</p>
                  </div>
                  <Toggle on={settings.assessment.evidenceCapture} onClick={() => setSettings((prev) => ({ ...prev, assessment: { ...prev.assessment, evidenceCapture: !prev.assessment.evidenceCapture } }))} />
                </div>
              </div>
            )}

            {tab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white mb-4">Appearance Settings</h3>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['dark', 'light'] as const).map((theme) => (
                      <button key={theme} onClick={() => setSettings((prev) => ({ ...prev, appearance: { ...prev.appearance, theme } }))} className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${settings.appearance.theme === theme ? 'border-primary-600/40 bg-primary-600/10 text-primary-300' : 'border-base-600/60 bg-base-700/40 text-gray-400'}`}>
                        <Palette className="w-4 h-4" />
                        <span className="text-sm capitalize">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-2 block">Density</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['comfortable', 'compact'] as const).map((density) => (
                      <button key={density} onClick={() => setSettings((prev) => ({ ...prev, appearance: { ...prev.appearance, density } }))} className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${settings.appearance.density === density ? 'border-primary-600/40 bg-primary-600/10 text-primary-300' : 'border-base-600/60 bg-base-700/40 text-gray-400'}`}>
                        <span className="text-sm capitalize">{density}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleSave} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 shrink-0 ${on ? 'bg-primary-600' : 'bg-base-500'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200 ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}
