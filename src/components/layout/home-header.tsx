"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          {session ? `Hola, ${session.user?.name}` : "BetDay Lite"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-2xl font-bold md:text-3xl"
        >
          Partidos del dia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-sm capitalize text-muted"
        >
          {today}
        </motion.p>

        {/* Stats pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          <div className="flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-xs font-medium text-muted">50 partidos hoy</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1.5">
            <span className="text-xs">🏆</span>
            <span className="text-xs font-medium text-muted">Premier League</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1.5">
            <span className="text-xs">📊</span>
            <span className="text-xs font-medium text-muted">Mercado 1X2</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
