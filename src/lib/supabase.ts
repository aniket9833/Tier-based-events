import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string | null;
  tier: "free" | "silver" | "gold" | "platinum";
  created_at: string;
};

export async function getPublicEvents() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return events as Event[];
}
