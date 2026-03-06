"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BetWithMatch } from "@/types";
import TeamLogo from "@/components/ui/team-logo";
import LeagueLogo from "@/components/ui/league-logo";

const statusConfig = {
  PENDING: {
    label: "Pendiente",
    bg: "bg-accent-yellow/10",
    text: "text-accent-yellow",
    border: "border-accent-yellow/30",
    icon: "⏳",
  },
  WON: {
    label: "Ganada",
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    border: "border-accent-green/30",
    icon: "🏆",
  },
  LOST: {
    label: "Perdida",
    bg: "bg-accent-red/10",
    text: "text-accent-red",
    border: "border-accent-red/30",
    icon: "❌",
  },
};

const pickLabels: Record<string, string> = {
  HOME: "Local (1)",
  DRAW: "Empate (X)",
  AWAY: "Visitante (2)",
};

export default function BetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [bet, setBet] = useState<BetWithMatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bets/${params.betId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setBet(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.betId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-surface-hover" />
        <div className="h-80 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  if (!bet) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <span className="mb-4 text-6xl">🔍</span>
        <h2 className="text-xl font-bold">Apuesta no encontrada</h2>
        <button
          onClick={() => router.push("/profile")}
          className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
        >
          Volver a Mis Apuestas
        </button>
      </motion.div>
    );
  }

  const config = statusConfig[bet.status];
  const potentialReturn = +(bet.odd * bet.stake).toFixed(2);

  return (
    <div className="mx-auto max-w-lg">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <span>←</span> Volver
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`overflow-hidden rounded-2xl border bg-surface ${config.border}`}
      >
        {/* Status header */}
        <div className={`px-6 py-5 ${config.bg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="text-2xl"
              >
                {config.icon}
              </motion.span>
              <div>
                <span className={`text-lg font-bold ${config.text}`}>
                  {config.label}
                </span>
                <p className="text-[10px] text-muted">{bet.id}</p>
              </div>
            </div>
            {bet.status === "PENDING" && (
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-accent-yellow animate-pulse" />
                <span className="text-xs text-accent-yellow">En curso</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5 p-6">
          {/* Match info with logos */}
          {bet.match && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-3 flex items-center justify-center gap-2 text-xs text-muted">
                <LeagueLogo
                  leagueId={bet.match.league.id}
                  leagueName={bet.match.league.name}
                  country={bet.match.league.country}
                  size={16}
                />
                <span>{bet.match.league.name}</span>
              </div>

              {/* Teams face-off */}
              <div className="flex items-center justify-between rounded-xl bg-surface-hover p-4">
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <TeamLogo
                    teamId={bet.match.homeTeam.id}
                    shortName={bet.match.homeTeam.shortName}
                    size={48}
                  />
                  <span className="text-sm font-bold">
                    {bet.match.homeTeam.name}
                  </span>
                </div>
                <div className="mx-3 flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs font-bold text-muted">
                    VS
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <TeamLogo
                    teamId={bet.match.awayTeam.id}
                    shortName={bet.match.awayTeam.shortName}
                    size={48}
                  />
                  <span className="text-sm font-bold">
                    {bet.match.awayTeam.name}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-center text-xs text-muted">
                {new Date(bet.match.startTime).toLocaleString("es-ES")}
              </p>
            </motion.div>
          )}

          {/* Bet details grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-xl bg-surface-hover p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted">
                Seleccion
              </p>
              <p className="mt-1 text-sm font-bold text-secondary">
                {pickLabels[bet.pick] || bet.pick}
              </p>
            </div>
            <div className="rounded-xl bg-surface-hover p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted">
                Cuota
              </p>
              <p className="mt-1 text-sm font-bold">{bet.odd.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-surface-hover p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted">
                Monto Apostado
              </p>
              <p className="mt-1 text-sm font-bold">${bet.stake}</p>
            </div>
            <div
              className={`rounded-xl p-3 text-center ${
                bet.status === "WON"
                  ? "bg-accent-green/10"
                  : bet.status === "LOST"
                  ? "bg-accent-red/10"
                  : "bg-surface-hover"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-muted">
                {bet.status === "WON"
                  ? "Ganancia"
                  : bet.status === "LOST"
                  ? "Resultado"
                  : "Retorno Potencial"}
              </p>
              <p
                className={`mt-1 text-sm font-bold ${
                  bet.status === "WON"
                    ? "text-accent-green"
                    : bet.status === "LOST"
                    ? "text-accent-red"
                    : "text-foreground"
                }`}
              >
                {bet.status === "LOST"
                  ? `-$${bet.stake}`
                  : `$${bet.return !== null ? bet.return.toFixed(2) : potentialReturn}`}
              </p>
            </div>
          </motion.div>

          {/* Timestamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-t border-border pt-3 text-center text-xs text-muted"
          >
            Apuesta realizada el{" "}
            {new Date(bet.placedAt).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
