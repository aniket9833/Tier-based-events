export type TierType = "free" | "silver" | "gold" | "platinum";

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: TierType;
}

export interface UserMetadata {
  tier: TierType;
}
