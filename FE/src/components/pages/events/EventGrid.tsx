import React from "react";
import type { GetEventResponseDto, GetFullEventResponseDto } from "@/types";
import EventCard from "./EventCard";
import { EventCardVariant } from "@/types";
interface EventGridProps {
  events: GetEventResponseDto[] | GetFullEventResponseDto[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} variant={EventCardVariant.GRID} />
      ))}
    </div>
  );
};

export default EventGrid;
