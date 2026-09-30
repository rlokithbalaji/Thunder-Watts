import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { aiSuggestions, generateAIResponse } from '@/data/mockData';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Hello! I am World Monitor AI, your Security Analysis Assistant. I operate in Safe Assessment Mode — I can analyze findings, explain vulnerabilities, suggest remediation, and generate reports. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages((prev) => [...prev, { role: 'ai', content: response }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl font-medium text-white shadow-2xl transition-all duration-300 ${
          open
            ? 'bg-base-600 scale-95'
            : 'bg-gradient-to-br from-primary-600 to-accent-600 hover:scale-105 shadow-primary-600/30 animate-pulse-glow'
        }`}
      >
        <Bot className="w-6 h-6" />
        {!open && <span className="text-sm hidden sm:inline">AI Security Assistant</span>}
        {open && <X className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[min(600px,calc(100vh-8rem))] glass-card shadow-2xl flex flex-col animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-base-600/60 bg-base-800/80">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">World Monitor AI</p>
              <p className="text-[10px] text-gray-500">Security Analysis Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-base-700 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Safe mode badge */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-primary-600/5 border-b border-base-600/40">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-[10px] text-primary-400 font-medium">AI operates in Safe Assessment Mode</span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary-600/20 text-primary-100 border border-primary-600/30 rounded-br-md'
                      : 'bg-base-700/60 text-gray-300 border border-base-600/60 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                      <span className="text-[10px] font-semibold text-primary-400">AI Analysis</span>
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-base-700/60 border border-base-600/60 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {aiSuggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1.5 rounded-lg bg-base-700/60 text-gray-400 border border-base-600/60 hover:border-primary-600/40 hover:text-primary-300 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-base-600/60">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(input); }}
                placeholder="Ask about vulnerabilities, remediation..."
                className="glass-input flex-1 px-3 py-2 text-sm"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
