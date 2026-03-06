"use client";

import { Match } from "@/types";
import EventCard from "./event-card";
import { motion } from "framer-motion";

interface TimelineProps {
  matches: Match[];
}

export default function Timeline({ matches }: TimelineProps) {
  // Agrupar matches por hora
  const grouped = matches.reduce<Record<string, Match[]>>((acc, match) => {
    const hour = new Date(match.startTime).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(match);
    return acc;
  }, {});

  const sortedHours = Object.keys(grouped).sort();

  return (
    <div className="timeline-line space-y-8 pl-10 md:pl-16">
      {sortedHours.map((hour, hourIdx) => (
        <div key={hour} className="relative">
          {/* Timeline dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: hourIdx * 0.1 }}
            className="absolute -left-10 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:-left-16 md:h-6 md:w-6"
          >
            <div className="h-2 w-2 rounded-full bg-primary" />
          </motion.div>

          {/* Hour label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: hourIdx * 0.1 }}
            className="mb-3"
          >
            <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
              {hour}
            </span>
            <span className="ml-2 text-xs text-muted">
              {grouped[hour].length} partido{grouped[hour].length > 1 ? "s" : ""}
            </span>
          </motion.div>

          {/* Events grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {grouped[hour].map((match, idx) => (
              <EventCard
                key={match.id}
                match={match}
                index={hourIdx * 2 + idx}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
