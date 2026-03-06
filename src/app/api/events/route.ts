import { NextResponse } from "next/server";
import { getAllMatches } from "@/lib/matches-store";

export async function GET() {
  const matches = getAllMatches();
  return NextResponse.json(matches);
}
