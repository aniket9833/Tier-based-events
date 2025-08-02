"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Event, TierType, UserMetadata } from "@/types";
import { supabase } from "@/lib/supabase";
import { canAccessTier } from "@/utils/tierUtils";
import EventCard from "./EventCard";

export default function EventsGrid() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    async function fetchEvents() {
      if (!user) return;

      const userTier: TierType =
        (user.publicMetadata as unknown as UserMetadata)?.tier || "free";

      const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (events) {
        const accessibleEvents = events.filter((event) =>
          canAccessTier(userTier, event.tier as TierType)
        );
        setEvents(accessibleEvents);
      }
      setLoading(false);
    }

    fetchEvents();
  }, [user, isLoaded]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg" />
            <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">No events available</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Check back later for new events
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
