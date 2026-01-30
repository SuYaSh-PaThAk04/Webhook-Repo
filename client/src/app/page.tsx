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

export default function Home() {
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function loadEvents() {
    const res = await fetch(`${backend}/api/events?limit=20`);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
    const t = setInterval(loadEvents, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Latest Repo Activity</h1>
      <p style={{ color: "#6b7280", marginTop: 0 }}>Auto-refresh every 15 seconds</p>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events yet. Push commits or create PRs in action-repo.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {events.map((ev, idx) => (
            <div
              key={idx}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            >
              <div style={{ fontSize: 16 }}>{ev.message}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                {ev.event_type.toUpperCase()} • {new Date(ev.timestamp).toUTCString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
