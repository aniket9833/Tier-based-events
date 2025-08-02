"use client";

import { useState } from "react";
import { TierType } from "@/types";

const tiers: TierType[] = ["free", "silver", "gold", "platinum"];

const tierColors = {
  free: "bg-gray-100 text-gray-800",
  silver: "bg-gray-200 text-gray-800",
  gold: "bg-yellow-100 text-yellow-800",
  platinum: "bg-purple-100 text-purple-800",
};

export default function TierFilter() {
  const [selectedTier, setSelectedTier] = useState<TierType | "all">("all");

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => setSelectedTier("all")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
          ${
            selectedTier === "all"
              ? "bg-[#6c47ff] text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
      >
        All
      </button>
      {tiers.map((tier) => (
        <button
          key={tier}
          onClick={() => setSelectedTier(tier)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${
              selectedTier === tier
                ? "bg-[#6c47ff] text-white"
                : `${tierColors[tier]} hover:opacity-80`
            }`}
        >
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </button>
      ))}
    </div>
  );
}
