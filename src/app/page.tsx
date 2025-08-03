import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { getPublicEvents } from "@/lib/supabase";
import EventCard from "@/components/EventCard";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  const events = await getPublicEvents();

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 pt-26">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Discover Amazing Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Join us to access exclusive events based on your membership tier
        </p>
        <SignInButton mode="modal">
          <button className="bg-[#6c47ff] hover:bg-[#5a3cd7] text-white rounded-full px-8 py-3 font-medium transition-colors">
            Sign in to access your events
          </button>
        </SignInButton>
      </section>

      {/* All Events Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">All Available Events</h2>
          <p className="text-sm text-gray-500">
            {events.length} events available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative group">
              <EventCard
                event={{
                  ...event,
                  image_url:
                    event.image_url || "/placeholder.svg?height=200&width=300",
                }}
              />
              {event.tier !== "free" && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full text-white text-sm font-semibold mb-3 inline-block capitalize">
                      {event.tier} Tier Required
                    </span>
                    <p className="text-white font-medium text-sm mb-4">
                      Sign in to access this exclusive event
                    </p>
                    <SignInButton mode="modal">
                      <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No events available</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new events
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
