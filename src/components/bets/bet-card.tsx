"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bet, Match } from "@/types";
import TeamLogo from "@/components/ui/team-logo";
import LeagueLogo from "@/components/ui/league-logo";

interface BetCardProps {
  bet: Bet;
  match?: Match;
  index: number;
}

const statusConfig = {
  PENDING: {
    label: "Pendiente",
    bg: "bg-accent-yellow/10",
    text: "text-accent-yellow",
    dot: "bg-accent-yellow",
    border: "border-accent-yellow/20",
    icon: "⏳",
  },
  WON: {
    label: "Ganada",
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    dot: "bg-accent-green",
    border: "border-accent-green/20",
    icon: "🏆",
  },
  LOST: {
    label: "Perdida",
    bg: "bg-accent-red/10",
    text: "text-accent-red",
    dot: "bg-accent-red",
    border: "border-accent-red/20",
    icon: "✗",
  },
};

const pickLabels: Record<string, string> = {
  HOME: "Local (1)",
  DRAW: "Empate (X)",
  AWAY: "Visitante (2)",
};

export default function BetCard({ bet, match, index }: BetCardProps) {
  const config = statusConfig[bet.status];
  const placedTime = new Date(bet.placedAt).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        href={`/bets/${bet.id}`}
        className={`group block overflow-hidden rounded-2xl border bg-surface transition-all hover:shadow-lg hover:shadow-primary/5 ${config.border}`}
      >
        {/* Status bar */}
        <div className={`flex items-center justify-between px-4 py-2 ${config.bg}`}>
          <div className="flex items-center gap-2">
            {match && (
              <>
                <LeagueLogo
                  leagueId={match.league.id}
                  leagueName={match.league.name}
                  country={match.league.country}
                  size={14}
                />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {match.league.name}
                </span>
              </>
            )}
          </div>
          <span
            className={`flex items-center gap-1.5 text-xs font-bold ${config.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${config.dot} ${
                bet.status === "PENDING" ? "animate-pulse" : ""
              }`}
            />
            {config.label}
          </span>
        </div>

        <div className="p-4">
          {/* Teams with logos */}
          {match ? (
            <div className="mb-3 flex items-center gap-3">
              <TeamLogo
                teamId={match.homeTeam.id}
                shortName={match.homeTeam.shortName}
                size={32}
              />
              <div className="flex-1">
                <p className="text-sm font-bold">
                  {match.homeTeam.name}
                  <span className="mx-1.5 text-muted">vs</span>
                  {match.awayTeam.name}
                </p>
                <p className="text-[10px] text-muted">{placedTime}</p>
              </div>
              <TeamLogo
                teamId={match.awayTeam.id}
                shortName={match.awayTeam.shortName}
                size={32}
              />
            </div>
          ) : (
            <div className="mb-3">
              <p className="text-sm font-bold text-muted">
                Partido {bet.matchId}
              </p>
              <p className="text-[10px] text-muted">{placedTime}</p>
            </div>
          )}

          {/* Bet details */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-secondary/15 px-2.5 py-1">
              <span className="text-xs font-bold text-secondary">
                {pickLabels[bet.pick] || bet.pick}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-surface-hover px-2 py-1">
              <span className="text-[10px] text-muted">Cuota</span>
              <span className="text-xs font-bold">{bet.odd.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-surface-hover px-2 py-1">
              <span className="text-[10px] text-muted">Apuesta</span>
              <span className="text-xs font-bold">${bet.stake}</span>
            </div>
            {bet.return !== null && bet.return > 0 && (
              <div className="ml-auto flex items-center gap-1 rounded-lg bg-accent-green/10 px-2 py-1">
                <span className="text-xs font-bold text-accent-green">
                  +${bet.return.toFixed(2)}
                </span>
              </div>
            )}
            {bet.status === "LOST" && (
              <div className="ml-auto flex items-center gap-1 rounded-lg bg-accent-red/10 px-2 py-1">
                <span className="text-xs font-bold text-accent-red">
                  -${bet.stake}
                </span>
              </div>
            )}
          </div>

          {/* Footer arrow */}
          <div className="mt-3 flex items-center justify-end">
            <motion.span
              className="text-xs text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
            >
              Ver detalle →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
