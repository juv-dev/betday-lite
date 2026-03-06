"use client";

import { motion } from "framer-motion";
import { BetPick } from "@/types";

interface OddsButtonProps {
  label: string;
  selection: BetPick;
  odds: number;
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}

export default function OddsButton({
  label,
  odds,
  onClick,
  disabled,
  isSelected,
}: OddsButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex flex-1 flex-col items-center gap-0.5 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
        isSelected
          ? "bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary/50"
          : "bg-surface-hover text-foreground hover:bg-border hover:shadow-md"
      } ${disabled && !isSelected ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
    >
      {/* Shimmer effect on hover */}
      {!disabled && !isSelected && (
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      )}
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[8px]"
        >
          ✓
        </motion.div>
      )}
      <span
        className={`text-[10px] uppercase tracking-wider ${
          isSelected ? "text-white/70" : "text-muted"
        }`}
      >
        {label}
      </span>
      <span className="text-base font-bold tabular-nums">{odds.toFixed(2)}</span>
    </motion.button>
  );
}
