import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Trash2, Activity, Radio, AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { liveEventTemplates } from '@/data/mockData';
import type { LiveEvent } from '@/types';

const severityConfig = {
  info: { color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/30', icon: Info },
  warn: { color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30', icon: AlertTriangle },
  critical: { color: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30', icon: AlertTriangle },
};

const typeConfig = {
  login: { icon: ShieldCheck, color: 'text-success-400' },
  api: { icon: Activity, color: 'text-primary-400' },
  authz: { icon: ShieldCheck, color: 'text-accent-400' },
  anomaly: { icon: AlertTriangle, color: 'text-warning-400' },
  info: { icon: Info, color: 'text-gray-400' },
};

let eventCounter = 0;

function generateEvent(): LiveEvent {
  const template = liveEventTemplates[Math.floor(Math.random() * liveEventTemplates.length)];
  const now = new Date();
  const timestamp = now.toLocaleTimeString('en-US', { hour12: false });
  eventCounter++;
  return {
    id: `live${eventCounter}`,
    timestamp,
    type: template.type,
    message: template.message,
    detail: template.detail,
    severity: template.severity,
  };
}

export function LiveMonitor() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const addEvent = useCallback(() => {
    setEvents((prev) => {
      const newEvent = generateEvent();
      const updated = [newEvent, ...prev].slice(0, 100);
      return updated;
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < 8; i++) addEvent();
  }, [addEvent]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(addEvent, 3000 + Math.random() * 2000);
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }
  }, [paused, addEvent]);

  const handleClear = () => setEvents([]);

  const criticalCount = events.filter((e) => e.severity === 'critical').length;
  const warnCount = events.filter((e) => e.severity === 'warn').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Monitor</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time security event stream — simulated WebSocket updates</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${paused ? 'btn-primary' : 'btn-secondary'}`}
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-error-400 hover:bg-error-500/10 border border-base-500 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`relative flex h-3 w-3 ${paused ? '' : ''}`}>
              {!paused && <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75 animate-ping" />}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${paused ? 'bg-warning-500' : 'bg-success-500'}`} />
            </div>
            <span className={`text-sm font-semibold ${paused ? 'text-warning-400' : 'text-success-400'}`}>
              {paused ? 'PAUSED' : 'LIVE'}
            </span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">{events.length} events</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-error-400" />
              <span className="text-xs text-gray-400">{criticalCount} critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-warning-400" />
              <span className="text-xs text-gray-400">{warnCount} warnings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event stream */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-base-600/60 flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">Event Stream</h3>
        </div>
        <div ref={listRef} className="max-h-[600px] overflow-y-auto">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Radio className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-500">No events. Click Resume to start streaming.</p>
            </div>
          ) : (
            <div className="divide-y divide-base-700/40">
              {events.map((event) => {
                const sevCfg = severityConfig[event.severity];
                const typeCfg = typeConfig[event.type];
                const TypeIcon = typeCfg.icon;
                const SevIcon = sevCfg.icon;
                return (
                  <div key={event.id} className="flex items-center gap-3 px-6 py-3 hover:bg-base-700/30 transition-colors animate-slide-up">
                    <span className="text-xs font-mono text-gray-500 shrink-0 w-20">{event.timestamp}</span>
                    <div className={`p-1.5 rounded-lg ${sevCfg.bg} shrink-0`}>
                      <TypeIcon className={`w-3.5 h-3.5 ${typeCfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200">{event.message}</p>
                      <p className="text-xs text-gray-500 truncate">{event.detail}</p>
                    </div>
                    {event.severity !== 'info' && (
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${sevCfg.bg} ${sevCfg.color} border ${sevCfg.border} shrink-0`}>
                        <SevIcon className="w-3 h-3" />
                        {event.severity}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
