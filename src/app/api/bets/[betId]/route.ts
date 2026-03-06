import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBetById } from "@/lib/bets-store";
import { getMatchById } from "@/lib/matches-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ betId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { betId } = await params;
  const bet = getBetById(betId);

  if (!bet) {
    return NextResponse.json({ error: "Bet not found" }, { status: 404 });
  }

  const match = getMatchById(bet.matchId);

  return NextResponse.json({ ...bet, match });
}
