"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Match, BetPick } from "@/types";
import OddsButton from "./odds-button";
import { getTeamColor } from "@/lib/league-icons";
import TeamLogo from "@/components/ui/team-logo";
import LeagueLogo from "@/components/ui/league-logo";

interface EventCardProps {
  match: Match;
  index: number;
}

export default function EventCard({ match, index }: EventCardProps) {
  const { data: session } = useSession();
  const [selectedBet, setSelectedBet] = useState<BetPick | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [stakeInput, setStakeInput] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  const time = new Date(match.startTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const homeColor = getTeamColor(match.homeTeam.id);
  const awayColor = getTeamColor(match.awayTeam.id);

  const potentialWin = (stakeInput * Math.max(match.market.odds.home, match.market.odds.draw, match.market.odds.away)).toFixed(2);

  async function placeBet(pick: BetPick) {
    if (!session) {
      toast.error("Inicia sesion para apostar", { icon: "🔒" });
      return;
    }
    if (selectedBet) return;

    setIsPlacing(true);
    const odd =
      pick === "HOME"
        ? match.market.odds.home
        : pick === "DRAW"
        ? match.market.odds.draw
        : match.market.odds.away;

    try {
      const res = await fetch("/api/bets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: match.id,
          pick,
          odd,
          stake: stakeInput,
        }),
      });

      if (!res.ok) throw new Error("Error al crear apuesta");

      setSelectedBet(pick);
      const pickLabel =
        pick === "HOME"
          ? match.homeTeam.name
          : pick === "DRAW"
          ? "Empate"
          : match.awayTeam.name;

      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-center gap-3 rounded-2xl border border-primary/30 bg-surface px-4 py-3 shadow-xl shadow-primary/10`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg">
              🎯
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Apuesta realizada</p>
              <p className="text-xs text-muted">
                {pickLabel} @ <span className="text-primary font-semibold">{odd.toFixed(2)}</span> - ${stakeInput}
              </p>
            </div>
            <div className="ml-2 rounded-lg bg-primary/10 px-2 py-1">
              <p className="text-[10px] text-muted">Ganancia</p>
              <p className="text-sm font-bold text-primary">
                ${(odd * stakeInput).toFixed(2)}
              </p>
            </div>
          </motion.div>
        ),
        { duration: 4000 }
      );
    } catch {
      toast.error("Error al realizar apuesta");
    } finally {
      setIsPlacing(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary/20"
      style={{
        boxShadow: isHovered
          ? `0 8px 32px -8px ${homeColor}15, 0 4px 16px -4px ${awayColor}10`
          : "none",
      }}
    >
      {/* Background gradient glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${homeColor}08 0%, transparent 50%), radial-gradient(ellipse at 70% 0%, ${awayColor}08 0%, transparent 50%)`,
        }}
      />

      {/* Gradient accent top bar */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${homeColor}, transparent 40%, transparent 60%, ${awayColor})`,
        }}
      />

      <div className="relative p-4">
        {/* Header: League + Time */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LeagueLogo
              leagueId={match.league.id}
              leagueName={match.league.name}
              country={match.league.country}
              size={18}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {match.league.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs font-medium text-muted">
              {time}
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="mb-5 flex items-center justify-between px-2">
          <motion.div
            className="flex flex-1 flex-col items-center gap-2 text-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <TeamLogo
                teamId={match.homeTeam.id}
                shortName={match.homeTeam.shortName}
                size={48}
              />
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 -z-10 blur-lg opacity-30"
                style={{ backgroundColor: homeColor }}
              />
            </div>
            <span className="text-sm font-bold leading-tight">
              {match.homeTeam.name}
            </span>
          </motion.div>

          <div className="mx-2 flex flex-col items-center gap-1">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover"
            >
              <span className="text-xs font-bold text-muted">VS</span>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-1 flex-col items-center gap-2 text-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <TeamLogo
                teamId={match.awayTeam.id}
                shortName={match.awayTeam.shortName}
                size={48}
              />
              <div
                className="absolute inset-0 -z-10 blur-lg opacity-30"
                style={{ backgroundColor: awayColor }}
              />
            </div>
            <span className="text-sm font-bold leading-tight">
              {match.awayTeam.name}
            </span>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Stake selector */}
        <AnimatePresence>
          {!selectedBet && session && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Monto apuesta:</span>
                <div className="flex items-center gap-1">
                  {[5, 10, 25, 50].map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setStakeInput(amount)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                        stakeInput === amount
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "bg-surface-hover text-muted hover:text-foreground"
                      }`}
                    >
                      ${amount}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="mt-1.5 text-right">
                <span className="text-[10px] text-muted">
                  Ganancia max:{" "}
                  <span className="font-semibold text-accent-green">
                    ${potentialWin}
                  </span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Odds buttons */}
        <div className="flex gap-2">
          <OddsButton
            label={match.homeTeam.shortName}
            selection="HOME"
            odds={match.market.odds.home}
            onClick={() => placeBet("HOME")}
            disabled={isPlacing || !!selectedBet}
            isSelected={selectedBet === "HOME"}
          />
          <OddsButton
            label="Empate"
            selection="DRAW"
            odds={match.market.odds.draw}
            onClick={() => placeBet("DRAW")}
            disabled={isPlacing || !!selectedBet}
            isSelected={selectedBet === "DRAW"}
          />
          <OddsButton
            label={match.awayTeam.shortName}
            selection="AWAY"
            odds={match.market.odds.away}
            onClick={() => placeBet("AWAY")}
            disabled={isPlacing || !!selectedBet}
            isSelected={selectedBet === "AWAY"}
          />
        </div>

        {/* Success state */}
        <AnimatePresence>
          {selectedBet && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="mt-3 overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-3 py-2">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white"
                >
                  ✓
                </motion.div>
                <span className="text-xs font-semibold text-primary">
                  Apuesta registrada - ${stakeInput} apostados
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
