"use client";

import { useState } from "react";
import Image from "next/image";
import { getTeamCrestUrl, getTeamColor } from "@/lib/league-icons";

interface TeamLogoProps {
  teamId: string;
  shortName: string;
  size?: number;
}

export default function TeamLogo({ teamId, shortName, size = 44 }: TeamLogoProps) {
  const crestUrl = getTeamCrestUrl(teamId);
  const [imgError, setImgError] = useState(false);
  const color = getTeamColor(teamId);

  if (!crestUrl || imgError) {
    // Fallback: shield SVG with team color
    return (
      <div style={{ width: size, height: size }} className="flex items-center justify-center">
        <svg viewBox="0 0 40 48" width={size * 0.85} height={size}>
          <defs>
            <linearGradient id={`shield-${teamId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M20 2 L37 10 L37 26 Q37 40 20 46 Q3 40 3 26 L3 10 Z"
            fill={`url(#shield-${teamId})`}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
          <text
            x="20"
            y="28"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            {shortName}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={crestUrl}
      alt={shortName}
      width={size}
      height={size}
      className="object-contain"
      onError={() => setImgError(true)}
    />
  );
}
