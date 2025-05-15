import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { EventService, UserService } from '@/api/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/useToast";
import { useAuthChange } from "@/hooks/useAuthChange";
import type { ErrorResponse, GetEventResponseDto, GetFullEventResponseDto } from '@/types';
import { PagesRoutesConstants, ToastVariantsConstants, TranslationConstants } from '@/utils/constants';
import { formatDate, formatTime } from '@/utils/date';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EventImage from '@/components/shared/EventImage';
import { openLoginModal } from '@/store/slices';
enum BookingStatus {
  BOOKED = 'booked',
  UNBOOKED = 'unbooked',
}

const EventDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [event, setEvent] = useState<GetEventResponseDto | GetFullEventResponseDto>();
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();
  const { user } = useAppSelector(state => state.auth);

  const fetchEvent = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await EventService.getEventById(id);
      const data: (GetEventResponseDto | GetFullEventResponseDto) = response as (GetEventResponseDto | GetFullEventResponseDto);
      setEvent(data);
    } catch (error) {
      const errorResponse : ErrorResponse = error as ErrorResponse;
      toast({
        title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
        description: errorResponse.response?.data?.message || t(TranslationConstants.EVENTS.GET_EVENT_FAILED),
        variant: ToastVariantsConstants.ERROR,
      });
      navigate(PagesRoutesConstants.EVENTS);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the event details
  useEffect(() => {
    fetchEvent();
  }, [id, navigate, t]);

  // Refetch event when auth changes
  useAuthChange(() => {
    fetchEvent();
  });

  const handleBookTickets = async (bookingStatus: BookingStatus) => {
    if (!id) return;
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    if(bookingStatus === BookingStatus.BOOKED) {
      try {
        await UserService.bookEvent(id);
        toast({
          title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
          description: t(TranslationConstants.EVENTS.BOOK_EVENT_SUCCESS),
          variant: ToastVariantsConstants.SUCCESS,
        });
        navigate(PagesRoutesConstants.SUCCESS);
      } catch (error) {
        const errorResponse : ErrorResponse = error as ErrorResponse;
        toast({
          title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
          description: errorResponse.response?.data?.message || t(TranslationConstants.EVENTS.BOOK_EVENT_FAILED),
          variant: ToastVariantsConstants.ERROR,
        });
      } finally {
        setIsBooking(false);
      }
    } else {
      try {
        await UserService.unbookEvent(id);
        toast({
          title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
          description: t(TranslationConstants.EVENTS.UNBOOK_EVENT_SUCCESS),
          variant: ToastVariantsConstants.SUCCESS,
        });
        navigate(PagesRoutesConstants.SUCCESS);
      } catch (error) {
        const errorResponse : ErrorResponse = error as ErrorResponse;
        toast({
          title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
          description: errorResponse.response?.data?.message || t(TranslationConstants.EVENTS.BOOK_EVENT_FAILED),
          variant: ToastVariantsConstants.ERROR,
        });
      } finally {
        setIsBooking(false);
      }
    }

  };

  if (loading || !event) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(PagesRoutesConstants.EVENTS)}
            className="border-duck-yellow/20 hover:bg-duck-yellow/10"
          >
            <span
              className="inline-block transition-transform rtl:rotate-180"
              aria-hidden="true"
            >
              ←
            </span> {t(TranslationConstants.EVENTS.ALL_EVENTS)}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Details */}
          <div className="flex-1">
            <div className="bg-white dark:bg-duck-brown/5 rounded-xl overflow-hidden border border-duck-yellow/20 shadow-lg p-6">
              <div className="h-64 bg-duck-water/30 dark:bg-duck-water/10 flex items-center justify-center rounded-lg mb-6">
                <EventImage src={`${import.meta.env.VITE_IMAGES_API_URL}${event.imageUrl}`} alt={event.name} />
              </div>
              <h1 className="text-3xl font-bold text-duck-brown dark:text-duck-yellow mb-4">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
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
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-duck-yellow/10 text-duck-brown dark:text-duck-yellow text-sm">
                  {formatDate(event.date)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-duck-yellow/10 text-duck-brown dark:text-duck-yellow text-sm">
                  {formatTime(event.date)}
                </span>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-2 border-b border-duck-yellow/10 pb-2">{t(TranslationConstants.EVENTS.DESCRIPTION)}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 border-b border-duck-yellow/10 pb-2">{t(TranslationConstants.EVENTS.LOCATION)}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.venue}
                    </p>
                  </div>
                </div>
                <div className="border-t border-duck-yellow/10 pt-6">
                  <h2 className="text-xl font-semibold mb-2">{t(TranslationConstants.EVENTS.DETAILS)}</h2>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t(TranslationConstants.EVENTS.PRICE)}:</span>
                      <span className="font-semibold">${event.price}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t(TranslationConstants.EVENTS.DATE)}:</span>
                      <span>{formatDate(event.date)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t(TranslationConstants.EVENTS.TIME)}:</span>
                      <span>{formatTime(event.date)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Part */}
          <div className="w-full lg:w-96 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <Card className="border-duck-yellow/20 shadow-lg rounded-xl bg-white dark:bg-duck-brown/10 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-duck-brown dark:text-duck-yellow">
                      {t(TranslationConstants.EVENTS.BOOKING_TITLE)}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      ${event.price} {t(TranslationConstants.EVENTS.PRICE)}
                    </p>
                  </div>
                  <div className="space-y-6">
                    {(event as unknown as GetFullEventResponseDto).isBooked ? (
                      <Button
                        onClick={() => handleBookTickets(BookingStatus.UNBOOKED)}
                        disabled={isBooking}
                        className="w-full bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                      >
                        {isBooking ? t(TranslationConstants.COMMON.LOADING) : t(TranslationConstants.EVENTS.UNBOOK)}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleBookTickets(BookingStatus.BOOKED)}
                        disabled={isBooking}
                        className="w-full bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                      >
                        {isBooking ? t(TranslationConstants.COMMON.LOADING) : t(TranslationConstants.EVENTS.BOOK)}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;