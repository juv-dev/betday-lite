import { getAllBets, getBetById, addBet } from "@/lib/bets-store";
import { Bet } from "@/types";

describe("bets-store", () => {
  describe("getAllBets", () => {
    it("returns an array of bets", () => {
      const bets = getAllBets();
      expect(Array.isArray(bets)).toBe(true);
      expect(bets.length).toBeGreaterThan(0);
    });

    it("returns a copy (not the original reference)", () => {
      const bets1 = getAllBets();
      const bets2 = getAllBets();
      expect(bets1).not.toBe(bets2);
      expect(bets1).toEqual(bets2);
    });

    it("each bet has required fields", () => {
      const bets = getAllBets();
      bets.forEach((bet) => {
        expect(bet).toHaveProperty("id");
        expect(bet).toHaveProperty("matchId");
        expect(bet).toHaveProperty("placedAt");
        expect(bet).toHaveProperty("pick");
        expect(bet).toHaveProperty("odd");
        expect(bet).toHaveProperty("stake");
        expect(bet).toHaveProperty("status");
      });
    });

    it("bets have valid status values", () => {
      const bets = getAllBets();
      const validStatuses = ["PENDING", "WON", "LOST"];
      bets.forEach((bet) => {
        expect(validStatuses).toContain(bet.status);
      });
    });

    it("bets have valid pick values", () => {
      const bets = getAllBets();
      const validPicks = ["HOME", "DRAW", "AWAY"];
      bets.forEach((bet) => {
        expect(validPicks).toContain(bet.pick);
      });
    });
  });

  describe("getBetById", () => {
    it("returns a bet by id", () => {
      const bet = getBetById("bet_001");
      expect(bet).toBeDefined();
      expect(bet?.id).toBe("bet_001");
    });

    it("returns undefined for non-existent id", () => {
      const bet = getBetById("non_existent_bet");
      expect(bet).toBeUndefined();
    });
  });

  describe("addBet", () => {
    it("adds a new bet and returns it", () => {
      const newBet: Bet = {
        id: "bet_test_999",
        matchId: "match_001",
        placedAt: new Date().toISOString(),
        pick: "HOME",
        odd: 2.5,
        stake: 20,
        status: "PENDING",
        return: null,
      };

      const result = addBet(newBet);
      expect(result).toEqual(newBet);
      expect(result.id).toBe("bet_test_999");
    });

    it("added bet appears in getAllBets", () => {
      const bets = getAllBets();
      const found = bets.find((b) => b.id === "bet_test_999");
      expect(found).toBeDefined();
    });

    it("added bet is at the beginning of the list", () => {
      const newBet: Bet = {
        id: "bet_test_first",
        matchId: "match_002",
        placedAt: new Date().toISOString(),
        pick: "DRAW",
        odd: 3.0,
        stake: 10,
        status: "PENDING",
        return: null,
      };

      addBet(newBet);
      const bets = getAllBets();
      expect(bets[0].id).toBe("bet_test_first");
    });

    it("new bet can be found by id", () => {
      const bet = getBetById("bet_test_first");
      expect(bet).toBeDefined();
      expect(bet?.pick).toBe("DRAW");
      expect(bet?.stake).toBe(10);
    });
  });
});
