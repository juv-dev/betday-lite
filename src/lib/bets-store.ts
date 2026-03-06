import { Bet, BetsResponse } from "@/types";
import betsData from "@/data/bets.me.50.json";

// Initialize from JSON, store in memory for mutations
const betsStore: Bet[] = (betsData as BetsResponse).bets.map((b) => ({ ...b }));

export function getAllBets(): Bet[] {
  return [...betsStore];
}

export function getBetById(betId: string): Bet | undefined {
  return betsStore.find((b) => b.id === betId);
}

export function addBet(bet: Bet): Bet {
  betsStore.unshift(bet);
  // Simular resolución aleatoria después de 15 segundos
  setTimeout(() => {
    const rand = Math.random();
    if (rand > 0.5) {
      bet.status = "WON";
      bet.return = +(bet.odd * bet.stake).toFixed(2);
    } else {
      bet.status = "LOST";
      bet.return = 0;
    }
  }, 15000);
  return bet;
}
