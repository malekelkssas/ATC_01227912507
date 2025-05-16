import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse, GetEventResponseDto, GetFullEventResponseDto } from "@/types";
import { useTranslation } from "react-i18next";
import { PagesRoutesConstants, ToastVariantsConstants, TranslationConstants } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import EventImage from "@/components/shared/EventImage";
import { Loader2 } from "lucide-react";
import { EventCardVariant } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { openLoginModal } from "@/store/slices";
import { useSkipReset } from "@/context";
import { UserService } from "@/api/services";
import { useToast } from "@/hooks/useToast";

interface EventCardProps {
  event: GetEventResponseDto | GetFullEventResponseDto;
  variant?: EventCardVariant;
}

const EventCard: React.FC<EventCardProps> = ({ event, variant = EventCardVariant.GRID }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { 
    pendingBookingEventId, 
    setSkipNextReset, 
    setPendingBookingEventId,
  } = useSkipReset();
  const [isBooked, setIsBooked] = useState((event as unknown as GetFullEventResponseDto).isBooked);


  const handleBook = async () => {
    try {
      setIsBooking(true);
      if (!user) {
        setSkipNextReset(true);
        setPendingBookingEventId(event._id);
        dispatch(openLoginModal());
        return;
      }
      await UserService.bookEvent(event._id);
      toast({
        title: t(TranslationConstants.EVENTS.BOOK_EVENT_SUCCESS),
        description: t(TranslationConstants.EVENTS.BOOK_EVENT_SUCCESS),
        variant: ToastVariantsConstants.SUCCESS,
      });
      setIsBooked(true);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      toast({
        title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
        description: errorResponse.message,
        variant: ToastVariantsConstants.ERROR,
      });
    } finally {
      setIsBooking(false);
    }
  };

  const renderButtons = () => (
    <div className="flex gap-2">
      {!isBooked && (
        <Button
          onClick={handleBook}
          disabled={isBooking || pendingBookingEventId === event._id}
          className="bg-duck-nature hover:bg-duck-nature/80 text-black dark:text-duck-brown"
        >
          {isBooking || pendingBookingEventId === event._id ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t(TranslationConstants.EVENTS.BOOKING)}
            </>
          ) : (
            t(TranslationConstants.EVENTS.BOOK)
          )}
        </Button>
      )}
      <Button 
        onClick={() => navigate(`${PagesRoutesConstants.EVENTS}/${event._id}`)}
        className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
      >
        {t(TranslationConstants.EVENTS.DETAILS)}
      </Button>
    </div>
  );

  if (variant === EventCardVariant.LIST) {
    return (
      <Card className="overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-duck-nature/20 transition-all duration-300 border-duck-yellow/20 flex flex-row w-4/5 min-h-[8rem] mx-auto">
        <div className="w-32 h-full bg-duck-water/20 dark:bg-duck-water/10 relative flex-shrink-0 flex flex-col justify-center items-center">
          {isBooked && (
            <div className="absolute top-2 rtl:left-2 ltr:right-2 z-10">
              <span className="duck-badge duck-badge-booked">
                {t(TranslationConstants.EVENTS.BOOKED)}
              </span>
            </div>
          )}
          <EventImage src={`${import.meta.env.VITE_IMAGES_API_URL}${event.imageUrl}`} alt={event.name} />
        </div>
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
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-duck-yellow/40 bg-duck-yellow/10 dark:bg-duck-brown/30 dark:text-white transition-colors duration-200 hover:bg-duck-yellow/30"
                  style={{ color: tag.color, borderColor: tag.color }}
                >
                  <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: tag.color }} />
                  {tag.name}
                </span>
              ))}
            </div>
            {renderButtons()}
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-duck-nature/20 transition-all duration-300 border-duck-yellow/20 flex flex-col">
      <div className="h-40 bg-duck-water/20 dark:bg-duck-water/10 relative">
        {isBooked && (
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
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-duck-yellow/40 bg-duck-yellow/10 dark:bg-duck-brown/30 dark:text-white transition-colors duration-200 hover:bg-duck-yellow/30"
              style={{ color: tag.color, borderColor: tag.color }}
            >
              <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: tag.color }} />
              {tag.name}
            </span>
          ))}
        </div>
        {renderButtons()}
      </CardFooter>
    </Card>
  );
};

export default EventCard; 