"use client";

import { useEffect, useState } from "react";
import { Bet, BetsResponse, Match } from "@/types";
import BetCard from "./bet-card";
import { motion } from "framer-motion";

export default function BetsList() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [matches, setMatches] = useState<Map<string, Match>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "WON" | "LOST">("ALL");

  useEffect(() => {
    async function load() {
      try {
        const [betsRes, matchesRes] = await Promise.all([
          fetch("/api/bets"),
          fetch("/api/events"),
        ]);
        const betsData: BetsResponse = await betsRes.json();
        const matchesData: Match[] = await matchesRes.json();

        setBets(betsData.bets);
        const matchMap = new Map<string, Match>();
        matchesData.forEach((m) => matchMap.set(m.id, m));
        setMatches(matchMap);
      } catch {
        // handle error silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filter === "ALL" ? bets : bets.filter((b) => b.status === filter);

  // Stats
  const totalBets = bets.length;
  const wonBets = bets.filter((b) => b.status === "WON").length;
  const totalStake = bets.reduce((sum, b) => sum + b.stake, 0);
  const totalReturn = bets.reduce((sum, b) => sum + (b.return || 0), 0);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-surface" />
        ))}
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <span className="mb-4 text-6xl">🎫</span>
        <h2 className="text-xl font-bold">Sin apuestas aun</h2>
        <p className="mt-2 text-sm text-muted">
          Ve a la pagina de eventos y realiza tu primera apuesta
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Total", value: totalBets, icon: "🎫" },
          { label: "Ganadas", value: wonBets, icon: "🏆" },
          { label: "Apostado", value: `$${totalStake}`, icon: "💰" },
          { label: "Retorno", value: `$${totalReturn.toFixed(0)}`, icon: "📈" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-surface p-3 text-center"
          >
            <span className="text-lg">{stat.icon}</span>
            <p className="mt-1 text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {(["ALL", "PENDING", "WON", "LOST"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface-hover text-muted hover:text-foreground"
            }`}
          >
            {f === "ALL" ? "Todas" : f === "PENDING" ? "Pendientes" : f === "WON" ? "Ganadas" : "Perdidas"}
          </button>
        ))}
      </div>

      {/* Bets list */}
      <div className="space-y-3">
        {filtered.map((bet, idx) => (
          <BetCard
            key={bet.id}
            bet={bet}
            match={matches.get(bet.matchId)}
            index={idx}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-muted">
          No hay apuestas con este filtro
        </p>
      )}
    </div>
  );
}
