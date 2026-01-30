"use client";
import { useEffect, useState } from "react";

type EventDoc = {
  event_type: "push" | "pull_request" | "merge";
  author: string;
  from_branch?: string | null;
  to_branch?: string | null;
  timestamp: string;
  message: string;
};

const eventConfig = {
  push: {
    icon: "↑",
    emoji: "🚀",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/50",
    particle: "bg-violet-400",
  },
  pull_request: {
    icon: "⊕",
    emoji: "🔄",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/50",
    particle: "bg-cyan-400",
  },
  merge: {
    icon: "⚡",
    emoji: "✨",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/50",
    particle: "bg-emerald-400",
  },
};

function Particles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute h-1 w-1 rounded-full ${color} opacity-0`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            animation: `particle ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function EventCard({ event, index }: { event: EventDoc; index: number }) {
  const config = eventConfig[event.event_type];
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      style={{
        animation: `slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both`,
        background: "rgba(10, 10, 10, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20 blur-xl`} 
             style={{ animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
      
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 transition-all duration-500 group-hover:opacity-10`} />
      
      {/* Particles */}
      {isHovered && <Particles color={config.particle} />}
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 1.5s ease-in-out',
        }}
      />
      
      <div className="relative p-6">
        <div className="flex items-start gap-5">
          {/* Icon badge with rotation animation */}
          <div className="relative shrink-0">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${config.bg} ${config.border} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl ${config.glow}`}>
              <span className="text-3xl transition-transform duration-500 group-hover:scale-125">
                {config.emoji}
              </span>
            </div>
            {/* Ripple effect */}
            <div className={`absolute inset-0 rounded-xl border ${config.border} opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150`} 
                 style={{ animation: 'ripple 1.5s ease-out infinite' }} />
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Event type badge with slide animation */}
            <div className="mb-3 flex items-center gap-3">
              <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${config.bg} ${config.border} border backdrop-blur-sm transition-all duration-300 group-hover:px-4 group-hover:shadow-lg`}>
                <span className="mr-1.5">{config.icon}</span>
                {event.event_type.replace("_", " ")}
              </span>
              
              {/* Pulse indicator */}
              <div className="relative flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${config.bg} border ${config.border} transition-all duration-300 group-hover:scale-150`} />
                <div className={`absolute h-2 w-2 rounded-full ${config.bg} opacity-0 group-hover:opacity-75 transition-all duration-300`}
                     style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              </div>
            </div>
            
            {/* Message with typing effect on hover */}
            <p className="mb-4 text-base leading-relaxed text-gray-100 transition-all duration-300 group-hover:text-white">
              {event.message}
            </p>
            
            {/* Author with avatar */}
            <div className="mb-3 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-xs font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110`}>
                {event.author.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-gray-200 transition-colors duration-300 group-hover:text-white">
                {event.author}
              </span>
            </div>
            
            {/* Metadata with icons */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {event.from_branch && (
                <div className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <code className="rounded-lg bg-white/5 px-3 py-1 text-xs font-mono text-cyan-400 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-500/30">
                    {event.from_branch}
                  </code>
                </div>
              )}
              
              {event.to_branch && (
                <div className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <code className="rounded-lg bg-white/5 px-3 py-1 text-xs font-mono text-emerald-400 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-emerald-500/30">
                    {event.to_branch}
                  </code>
                </div>
              )}
              
              <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(event.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-36 rounded-2xl border border-white/8 bg-gradient-to-r from-white/3 via-white/5 to-white/3 relative overflow-hidden"
          style={{ 
            animation: `shimmer 2s ease-in-out ${i * 0.2}s infinite`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
               style={{ animation: 'shimmerSlide 2s ease-in-out infinite' }} />
        </div>
      ))}
    </div>
  );
}

function FloatingOrb({ delay, color, size }: { delay: number; color: string; size: string }) {
  return (
    <div
      className={`absolute rounded-full ${color} ${size} blur-3xl opacity-20`}
      style={{
        animation: `float 20s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function Home() {
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [newEventCount, setNewEventCount] = useState(0);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Function to deduplicate events based on unique identifier
  function deduplicateEvents(eventList: EventDoc[]): EventDoc[] {
    const seen = new Set<string>();
    return eventList.filter((event) => {
      // Create a unique key based on event properties
      const key = `${event.event_type}-${event.author}-${event.message}-${event.timestamp}-${event.from_branch || ''}-${event.to_branch || ''}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  async function loadEvents() {
    try {
      const res = await fetch(`${backend}/api/events?limit=20`);
      const data = await res.json();
      
      // Deduplicate the events
      const uniqueEvents = deduplicateEvents(data);
      
      if (events.length > 0 && uniqueEvents.length > events.length) {
        setNewEventCount(uniqueEvents.length - events.length);
        setTimeout(() => setNewEventCount(0), 3000);
      }
      
      setEvents(uniqueEvents);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
    const t = setInterval(loadEvents, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} color="bg-violet-500/10" size="h-96 w-96 top-1/4 -left-48" />
        <FloatingOrb delay={5} color="bg-cyan-500/10" size="h-96 w-96 bottom-1/4 -right-48" />
        <FloatingOrb delay={10} color="bg-emerald-500/10" size="h-64 w-64 top-1/2 left-1/2" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-16">
        {/* Header with animations */}
        <div className="mb-16" style={{ animation: 'fadeInDown 0.8s ease-out' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 shadow-2xl shadow-violet-500/50 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <svg className="h-9 w-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-violet-500/30" 
                   style={{ animation: 'spin 8s linear infinite' }} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2"
                      style={{ animation: 'glow 2s ease-in-out infinite' }}>
                    Repository Activity
                  </h1>
                  <p className="text-gray-400 text-sm">Real-time development insights</p>
                </div>
                
                {/* Repository Link */}
                <a
                  href="https://github.com/SuYaSh-PaThAk04/Action-Repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
                >
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    View Repository
                  </span>
                  <svg className="h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Live indicator */}
            <div className="flex items-center gap-3 rounded-full bg-white/3 px-5 py-2.5 border border-white/10 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/5 hover:scale-105">
              <div className="relative flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-500" style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              </div>
              <span className="text-gray-300 font-medium">Live</span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-gray-400">Refreshes every 15s</span>
            </div>
            
            {/* New events badge */}
            {newEventCount > 0 && (
              <div className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-2.5 text-white font-bold shadow-lg shadow-violet-500/50"
                   style={{ animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
                +{newEventCount} new {newEventCount === 1 ? 'event' : 'events'}
              </div>
            )}
            
            {lastUpdate && (
              <div className="text-gray-500 transition-colors duration-300 hover:text-gray-300">
                Updated {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center"
               style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <div className="relative mb-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/3 border border-white/8 backdrop-blur-xl transition-transform duration-500 hover:scale-110">
                <svg className="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              {/* Orbit ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/10"
                   style={{ animation: 'spin 10s linear infinite' }} />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-200">No events yet</h3>
            <p className="text-gray-400 max-w-md">Push commits or create pull requests to see your activity stream come alive</p>
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((ev, idx) => (
              <EventCard key={idx} event={ev} index={idx} />
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 10px) scale(1.05);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes particle {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, 20px), var(--ty, -30px)) scale(1);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes shimmerSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            text-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}