import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, Zap, Lock as LockIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Login() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. Use the demo login or click "Continue with Demo Environment".');
    }
  };

  const fillDemo = () => {
    setEmail('admin@worldmonitor.demo');
    setPassword('Demo@123');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side — Branding */}
      <div className="lg:flex-1 bg-gradient-to-br from-base-900 via-base-800 to-base-900 flex flex-col justify-center items-center px-8 py-12 relative overflow-hidden">
        {/* Decorative grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-2xl shadow-primary-600/40 mb-6 animate-pulse-glow">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">WORLD MONITOR</h1>
          <p className="text-primary-400 text-sm font-medium mb-8">
            AI-Powered Security Monitoring & Assessment Platform
          </p>

          <div className="glass-card p-6 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success-500/15">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-success-400">SYSTEM ONLINE</p>
                <p className="text-xs text-gray-500">Authorized Security Environment</p>
              </div>
            </div>

            <div className="border-t border-base-600/60 pt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <LockIcon className="w-3.5 h-3.5 text-primary-400" />
                Controlled security-testing platform
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Shield className="w-3.5 h-3.5 text-primary-400" />
                Synthetic/demo data only
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Zap className="w-3.5 h-3.5 text-primary-400" />
                AI-powered vulnerability analysis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — Login form */}
      <div className="lg:flex-1 flex items-center justify-center px-8 py-12 bg-base-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">WORLD MONITOR</h1>
              <p className="text-xs text-primary-400">Security Platform</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your security dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-error-500/10 border border-error-500/30 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-error-400 mt-0.5 shrink-0" />
                <p className="text-xs text-error-400">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@worldmonitor.demo"
                  className="glass-input w-full pl-10 pr-4 py-3 text-sm"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Demo@123"
                  className="glass-input w-full pl-10 pr-10 py-3 text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-base-500 bg-base-700 text-primary-600 focus:ring-primary-500/30"
                />
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login button */}
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
              <LogIn className="w-4 h-4" />
              Sign In
            </button>

            {/* Demo credentials helper */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full text-xs text-gray-500 hover:text-primary-400 transition-colors py-1"
            >
              Click to fill demo credentials
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-600/60" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-base-900 text-gray-500">or</span>
              </div>
            </div>

            {/* Demo login */}
            <button
              type="button"
              onClick={demoLogin}
              className="btn-secondary w-full py-3 flex items-center justify-center gap-2 text-sm"
            >
              <Zap className="w-4 h-4 text-primary-400" />
              Continue with Demo Environment
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-600 mt-6">
            This is a controlled security-testing platform using synthetic/demo data only.
          </p>
        </div>
      </div>
    </div>
  );
}
