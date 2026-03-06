import { Match, MatchesResponse } from "@/types";
import matchesData from "@/data/matches.today.50.json";

const data = matchesData as MatchesResponse;

export function getAllMatches(): Match[] {
  return data.matches;
}

export function getMatchById(matchId: string): Match | undefined {
  return data.matches.find((m) => m.id === matchId);
}
