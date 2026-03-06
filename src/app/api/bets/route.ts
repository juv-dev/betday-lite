import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addBet, getAllBets } from "@/lib/bets-store";
import { BetPick } from "@/types";

let betCounter = 100;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bets = getAllBets();
  return NextResponse.json({ bets });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { matchId, pick, odd, stake } = body as {
    matchId: string;
    pick: BetPick;
    odd: number;
    stake: number;
  };

  betCounter++;
  const bet = addBet({
    id: `bet_${String(betCounter).padStart(3, "0")}`,
    matchId,
    placedAt: new Date().toISOString(),
    pick,
    odd,
    stake,
    status: "PENDING",
    return: null,
  });

  return NextResponse.json(bet, { status: 201 });
}
