import {
  getLeagueLogoUrl,
  getLeagueFlag,
  getTeamColor,
  getTeamCrestUrl,
} from "@/lib/league-icons";

describe("getLeagueLogoUrl", () => {
  it("returns the premier league logo path", () => {
    expect(getLeagueLogoUrl("premier_league")).toBe(
      "/leagues/premier-league.png"
    );
  });

  it("returns null for unknown league", () => {
    expect(getLeagueLogoUrl("unknown_league")).toBeNull();
  });

  it("returns paths for all configured leagues", () => {
    const leagues = [
      "premier_league",
      "la_liga",
      "bundesliga",
      "serie_a",
      "ligue_1",
    ];
    leagues.forEach((id) => {
      expect(getLeagueLogoUrl(id)).not.toBeNull();
    });
  });
});

describe("getLeagueFlag", () => {
  it("returns England flag", () => {
    expect(getLeagueFlag("England")).toBe("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
  });

  it("returns Spain flag", () => {
    expect(getLeagueFlag("Spain")).toBe("🇪🇸");
  });

  it("returns football emoji for unknown country", () => {
    expect(getLeagueFlag("Mars")).toBe("⚽");
  });
});

describe("getTeamColor", () => {
  it("returns Arsenal red", () => {
    expect(getTeamColor("ars")).toBe("#EF0107");
  });

  it("returns Liverpool red", () => {
    expect(getTeamColor("liv")).toBe("#C8102E");
  });

  it("returns Burnley color", () => {
    expect(getTeamColor("bur")).toBe("#6C1D45");
  });

  it("returns Sheffield United color", () => {
    expect(getTeamColor("shu")).toBe("#EE2737");
  });

  it("returns default gray for unknown team", () => {
    expect(getTeamColor("xyz")).toBe("#64748b");
  });
});

describe("getTeamCrestUrl", () => {
  it("returns correct URL for Arsenal", () => {
    expect(getTeamCrestUrl("ars")).toBe(
      "https://crests.football-data.org/57.png"
    );
  });

  it("returns correct URL for Liverpool", () => {
    expect(getTeamCrestUrl("liv")).toBe(
      "https://crests.football-data.org/64.png"
    );
  });

  it("returns correct URL for Burnley", () => {
    expect(getTeamCrestUrl("bur")).toBe(
      "https://crests.football-data.org/328.png"
    );
  });

  it("returns correct URL for Sheffield United", () => {
    expect(getTeamCrestUrl("shu")).toBe(
      "https://crests.football-data.org/356.png"
    );
  });

  it("returns null for unknown team", () => {
    expect(getTeamCrestUrl("xyz")).toBeNull();
  });

  it("returns URLs for all 22 teams", () => {
    const teams = [
      "ars", "avl", "bou", "bre", "bha", "che", "cry", "eve", "ful",
      "ips", "lei", "liv", "mci", "mun", "new", "nfo", "sou", "tot",
      "whu", "wol", "bur", "shu",
    ];
    teams.forEach((id) => {
      const url = getTeamCrestUrl(id);
      expect(url).not.toBeNull();
      expect(url).toMatch(/^https:\/\/crests\.football-data\.org\/\d+\.png$/);
    });
  });
});
