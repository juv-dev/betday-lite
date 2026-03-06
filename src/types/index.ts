export interface League {
  id: string;
  name: string;
  country: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface MarketOdds {
  home: number;
  draw: number;
  away: number;
}

export interface Market {
  type: string;
  odds: MarketOdds;
}

export interface Match {
  id: string;
  startTime: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  market: Market;
}

export interface MatchesResponse {
  date: string;
  timezone: string;
  matches: Match[];
}

export type BetPick = "HOME" | "DRAW" | "AWAY";

export type BetStatus = "PENDING" | "WON" | "LOST";

export interface Bet {
  id: string;
  matchId: string;
  placedAt: string;
  pick: BetPick;
  odd: number;
  stake: number;
  status: BetStatus;
  return: number | null;
}

export interface BetsResponse {
  bets: Bet[];
}

// Enriched bet with match info for display
export interface BetWithMatch extends Bet {
  match?: Match;
}
