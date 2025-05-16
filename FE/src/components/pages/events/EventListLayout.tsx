import React from "react";
import type { GetEventResponseDto, GetFullEventResponseDto } from "@/types";
import EventCard from "./EventCard";
import { EventCardVariant } from "@/types"; 
interface EventListLayoutProps {
  events: GetEventResponseDto[] | GetFullEventResponseDto[];
}

const EventListLayout: React.FC<EventListLayoutProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
      {events.map((event) => (
        <EventCard key={event._id} event={event} variant={EventCardVariant.LIST} />
      ))}
    </div>
  );
};

export default EventListLayout;
