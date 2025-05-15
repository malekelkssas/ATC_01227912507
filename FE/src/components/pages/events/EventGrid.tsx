import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { GetEventResponseDto, GetFullEventResponseDto } from "@/types";
import { useTranslation } from "react-i18next";
import { TranslationConstants } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import EventImage from "@/components/shared/EventImage";

interface EventGridProps {
  events: GetEventResponseDto[] | GetFullEventResponseDto[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <Card key={event._id} className="overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-duck-yellow/10 transition-all duration-300 border-duck-yellow/20 flex flex-col">
          <div className="h-40 bg-duck-water/20 dark:bg-duck-water/10 relative">
            {(event as unknown as GetFullEventResponseDto).isBooked && (
              <div className="absolute top-2 rtl:left-2 ltr:right-2 z-10">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-duck-yellow/90 text-duck-brown text-xs font-medium shadow-sm">
                  {t(TranslationConstants.EVENTS.BOOKED)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <EventImage src={`${import.meta.env.VITE_IMAGES_API_URL}${event.imageUrl}`} alt={event.name} />
            </div>
          </div>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription className="flex justify-between">
              <span>{formatDate(event.date)}</span>
              <span className="font-semibold text-duck-brown dark:text-duck-yellow">${event.price}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {event.description}
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="truncate">{event.venue}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2 flex-wrap">
              {event.category.map(tag => (
                <span
                  key={tag._id}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium dark:text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <Button 
              onClick={() => navigate(`/events/${event._id}`)}
              className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
            >
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventGrid;
