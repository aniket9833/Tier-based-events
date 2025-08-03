import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPublicEvents } from "@/lib/supabase";
import EventCard from "@/components/EventCard";

const tierOrder = ["free", "silver", "gold", "platinum"];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  // Get user tier from public metadata, default to "free"
  const userTier = (user?.publicMetadata?.tier as string) || "free";

  const events = await getPublicEvents();

  // Only show events at or below user's tier
  const accessibleEvents = events.filter(
    (event) => tierOrder.indexOf(event.tier) <= tierOrder.indexOf(userTier)
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 mt-22">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Events</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your current tier:{" "}
          <span className="capitalize font-semibold text-purple-600">
            {userTier}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You have access to {accessibleEvents.length} events
        </p>
      </div>

      {accessibleEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={{
                ...event,
                image_url:
                  event.image_url || "/placeholder.svg?height=200&width=300",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No events available</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Upgrade your tier to access more exclusive events
          </p>
        </div>
      )}
    </div>
  );
}
