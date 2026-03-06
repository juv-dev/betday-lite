"use client";

import { useEffect, useState } from "react";
import { Match } from "@/types";
import Timeline from "./timeline";

export default function EventsLoader() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 pl-10 md:pl-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-16 animate-pulse rounded-lg bg-surface-hover" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, j) => (
                <div
                  key={j}
                  className="h-52 animate-pulse rounded-2xl bg-surface"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="mb-4 text-6xl">⚽</span>
        <h2 className="text-xl font-bold">No hay partidos hoy</h2>
        <p className="text-sm text-muted">Vuelve mas tarde para ver los eventos del dia</p>
      </div>
    );
  }

  return <Timeline matches={matches} />;
}
