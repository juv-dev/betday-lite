"use client";

import { useState } from "react";
import Image from "next/image";
import { getLeagueLogoUrl, getLeagueFlag } from "@/lib/league-icons";

interface LeagueLogoProps {
  leagueId: string;
  leagueName: string;
  country: string;
  size?: number;
}

export default function LeagueLogo({
  leagueId,
  leagueName,
  country,
  size = 20,
}: LeagueLogoProps) {
  const logoUrl = getLeagueLogoUrl(leagueId);
  const [imgError, setImgError] = useState(false);

  if (!logoUrl || imgError) {
    return (
      <span className="text-sm" title={leagueName}>
        {getLeagueFlag(country)}
      </span>
    );
  }

  return (
    <div className="flex h-5 w-5 items-center justify-center rounded bg-white p-0.5">
      <Image
        src={logoUrl}
        alt={leagueName}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
