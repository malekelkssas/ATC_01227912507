import React from "react";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { GetEventResponseDto, GetFullEventResponseDto } from "@/types";
import { useTranslation } from "react-i18next";
import { TranslationConstants } from "@/utils/constants";
import { formatDate } from "@/utils/date";

interface EventListLayoutProps {
  events: GetEventResponseDto[] | GetFullEventResponseDto[];
}

const EventListLayout: React.FC<EventListLayoutProps> = ({ events }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
      {events.map((event) => (
        <Card
          key={event._id}
          className={`overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-duck-yellow/10 transition-all duration-300 border-duck-yellow/20 flex flex-row w-4/5 min-h-[8rem] mx-auto`}
        >
          <div className="w-32 h-full bg-duck-water/20 dark:bg-duck-water/10 relative flex-shrink-0 flex flex-col justify-center items-center">
            {(event as unknown as GetFullEventResponseDto).isBooked && (
              <div className="absolute top-2 rtl:left-2 ltr:right-2 z-10">
                <span className="duck-badge duck-badge-booked">
                  {t(TranslationConstants.EVENTS.BOOKED)}
                </span>
              </div>
            )}
            <span className="text-3xl">🦆</span>
          </div>
          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{event.name}</CardTitle>
                <span className="font-semibold text-duck-brown dark:text-duck-yellow">${event.price}</span>
              </div>
              <CardDescription className="text-xs mb-1">{formatDate(event.date)}</CardDescription>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {event.description}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {event.venue}
              </div>
            </div>
            <CardFooter className="flex justify-between items-center mt-4 p-0 border-t border-duck-yellow/20 pt-2">
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
                className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown px-4 py-1 text-xs"
              >
                Details
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventListLayout;
