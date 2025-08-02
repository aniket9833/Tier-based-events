import { TierType } from "@/types";

const tierLevels: Record<TierType, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};

export function canAccessTier(
  userTier: TierType,
  eventTier: TierType
): boolean {
  return tierLevels[userTier] >= tierLevels[eventTier];
}
