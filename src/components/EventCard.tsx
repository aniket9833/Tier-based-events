import Image from "next/image";
import { Event } from "@/types";

const tierColors = {
  free: "bg-gray-500",
  silver: "bg-slate-400",
  gold: "bg-yellow-500",
  platinum: "bg-purple-600",
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <span
            className={`${
              tierColors[event.tier]
            } text-white px-2 py-1 rounded-full text-sm`}
          >
            {event.tier}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {event.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(event.event_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
