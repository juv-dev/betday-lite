import { getAllMatches, getMatchById } from "@/lib/matches-store";

describe("matches-store", () => {
  describe("getAllMatches", () => {
    it("returns an array of matches", () => {
      const matches = getAllMatches();
      expect(Array.isArray(matches)).toBe(true);
      expect(matches.length).toBe(50);
    });

    it("each match has required fields", () => {
      const matches = getAllMatches();
      matches.forEach((match) => {
        expect(match).toHaveProperty("id");
        expect(match).toHaveProperty("startTime");
        expect(match).toHaveProperty("league");
        expect(match).toHaveProperty("homeTeam");
        expect(match).toHaveProperty("awayTeam");
        expect(match).toHaveProperty("market");
      });
    });

    it("each match has valid league structure", () => {
      const matches = getAllMatches();
      matches.forEach((match) => {
        expect(match.league).toHaveProperty("id");
        expect(match.league).toHaveProperty("name");
        expect(match.league).toHaveProperty("country");
      });
    });

    it("each match has valid team structure", () => {
      const matches = getAllMatches();
      matches.forEach((match) => {
        expect(match.homeTeam).toHaveProperty("id");
        expect(match.homeTeam).toHaveProperty("name");
        expect(match.homeTeam).toHaveProperty("shortName");
        expect(match.awayTeam).toHaveProperty("id");
        expect(match.awayTeam).toHaveProperty("name");
        expect(match.awayTeam).toHaveProperty("shortName");
      });
    });

    it("each match has valid market with numeric odds", () => {
      const matches = getAllMatches();
      matches.forEach((match) => {
        expect(match.market.type).toBe("1X2");
        expect(typeof match.market.odds.home).toBe("number");
        expect(typeof match.market.odds.draw).toBe("number");
        expect(typeof match.market.odds.away).toBe("number");
        expect(match.market.odds.home).toBeGreaterThan(1);
        expect(match.market.odds.draw).toBeGreaterThan(1);
        expect(match.market.odds.away).toBeGreaterThan(1);
      });
    });
  });

  describe("getMatchById", () => {
    it("returns a match by id", () => {
      const match = getMatchById("match_001");
      expect(match).toBeDefined();
      expect(match?.id).toBe("match_001");
    });

    it("returns correct match details", () => {
      const match = getMatchById("match_001");
      expect(match?.homeTeam.name).toBe("Brighton");
      expect(match?.awayTeam.name).toBe("Brentford");
      expect(match?.league.name).toBe("Premier League");
    });

    it("returns undefined for non-existent id", () => {
      const match = getMatchById("match_999");
      expect(match).toBeUndefined();
    });

    it("finds all matches from 001 to 050", () => {
      for (let i = 1; i <= 50; i++) {
        const id = `match_${String(i).padStart(3, "0")}`;
        expect(getMatchById(id)).toBeDefined();
      }
    });
  });
});
