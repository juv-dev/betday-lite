// League logo paths (local SVGs for reliability)
const leagueLogos: Record<string, string> = {
  premier_league: "/leagues/premier-league.png",
  la_liga: "/leagues/la-liga.svg",
  bundesliga: "/leagues/bundesliga.svg",
  serie_a: "/leagues/serie-a.svg",
  ligue_1: "/leagues/ligue-1.svg",
};

export function getLeagueLogoUrl(leagueId: string): string | null {
  return leagueLogos[leagueId] || null;
}

// Map league country to flag/icon (fallback)
const countryFlags: Record<string, string> = {
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Portugal: "🇵🇹",
  Netherlands: "🇳🇱",
  Brazil: "🇧🇷",
  Argentina: "🇦🇷",
};

export function getLeagueFlag(country: string): string {
  return countryFlags[country] || "⚽";
}

// Team colors for visual identity
const teamColors: Record<string, string> = {
  ars: "#EF0107",
  liv: "#C8102E",
  che: "#034694",
  mci: "#6CABDD",
  mun: "#DA291C",
  tot: "#132257",
  bha: "#0057B8",
  bre: "#E30613",
  lei: "#003090",
  whu: "#7A263A",
  wol: "#FDB913",
  nfo: "#DD0000",
  ful: "#000000",
  avl: "#670E36",
  eve: "#003399",
  cry: "#1B458F",
  new: "#241F20",
  bou: "#DA291C",
  ips: "#0033A0",
  sou: "#D71920",
  bur: "#6C1D45",
  shu: "#EE2737",
};

export function getTeamColor(teamId: string): string {
  return teamColors[teamId] || "#64748b";
}

// football-data.org crest IDs for Premier League teams
const teamCrestIds: Record<string, number> = {
  ars: 57,
  avl: 58,
  bou: 1044,
  bre: 402,
  bha: 397,
  che: 61,
  cry: 354,
  eve: 62,
  ful: 63,
  ips: 349,
  lei: 338,
  liv: 64,
  mci: 65,
  mun: 66,
  new: 67,
  nfo: 351,
  sou: 340,
  tot: 73,
  whu: 563,
  wol: 76,
  bur: 328,
  shu: 356,
};

export function getTeamCrestUrl(teamId: string): string | null {
  const crestId = teamCrestIds[teamId];
  if (!crestId) return null;
  return `https://crests.football-data.org/${crestId}.png`;
}
