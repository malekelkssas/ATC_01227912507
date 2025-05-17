import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { EventService } from "@/api/services";
import type { ErrorResponse, GetEventAdminResponseDto, PaginationQueryDto, PaginationResponseDto } from "@/types";
import { useTranslation } from "react-i18next";
import { LanguagesConstants } from '@/utils/constants';
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants, TranslationConstants } from "@/utils/constants";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface EventsTableProps {
    setEventsCount: React.Dispatch<React.SetStateAction<number>>;
    eventsCount: number;
}

const EventsTable = ({ setEventsCount, eventsCount }: EventsTableProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationQueryDto>({
        page: 0,
        limit: 5,
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);

    const [events, setEvents] = useState<PaginationResponseDto<GetEventAdminResponseDto>>();
    const { toast } = useToast();
    const { t, i18n } = useTranslation();
    const language = i18n.language as LanguagesConstants;

    // Fetch events
    useEffect(() => {
        const getEvents = async () => {
            setIsLoading(true);
            try {
                const newEvents = await EventService.getFullEvents(pagination) as PaginationResponseDto<GetEventAdminResponseDto>;
                setEvents((prev) => {
                    if (!prev) return newEvents;
                    return {
                        ...newEvents,
                        data: newEvents.data,
                    };
                });
                if (eventsCount !== newEvents.pagination.total) {
                    setEventsCount(newEvents.pagination.total);
                }
                setIsLoading(false);
            } catch (error) {
                const errorResponse = error as ErrorResponse;
                toast({
                    title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                    description: errorResponse.response?.data?.message || t(TranslationConstants.EVENTS.GET_EVENTS_FAILED),
                    variant: ToastVariantsConstants.ERROR,
                });
            } finally {
                setIsLoading(false);
            }
        }
        getEvents();
    }, [pagination.page]);

    const handlePreviousPage = () => {
        if (events && events.pagination.page > 0) {
            setPagination(prev => ({
                ...prev,
                page: events.pagination.page - 1
            }));
        }
    };

    const handleNextPage = () => {
        if (events && events.pagination.hasMore) {
            setPagination(prev => ({
                ...prev,
                page: events.pagination.page + 1
            }));
        }
    };

    const handleDeleteClick = (eventId: string) => {
        setEventToDelete(eventId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!eventToDelete) return;

        try {
            await EventService.deleteEvent(eventToDelete);
            // Refetch the current page
            const newEvents = await EventService.getFullEvents(pagination) as PaginationResponseDto<GetEventAdminResponseDto>;
            setEvents(newEvents);
            setEventsCount(newEvents.pagination.total);
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
                description: t(TranslationConstants.COMMON.MESSAGES.SUCCESS_DESCRIPTION),
                variant: ToastVariantsConstants.SUCCESS,
            });
        } catch (error) {
            const errorResponse = error as ErrorResponse;
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                description: errorResponse.response?.data?.message || t(TranslationConstants.COMMON.MESSAGES.ERROR),
                variant: ToastVariantsConstants.ERROR,
            });
        } finally {
            setDeleteDialogOpen(false);
            setEventToDelete(null);
        }
    };

    return (
        <>
            <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            {t(TranslationConstants.ADMIN.EVENTS.MANAGE_EVENTS)}
                        </CardTitle>
                    </div>
                    <Button 
                        className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                    >
                        {t(TranslationConstants.ADMIN.EVENTS.CREATE_EVENT)}
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.EVENTS.TITLE)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.EVENTS.DATE)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.EVENTS.LOCATION)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.EVENTS.PRICE)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center w-[200px]">
                                            {t(TranslationConstants.COMMON.BUTTONS.ACTIONS)}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dark:bg-duck-brown/5 divide-y divide-duck-yellow/10">
                                    {events && events.data.length > 0 ? (
                                        events.data.map((event) => (
                                            <tr key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/10">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {event.name[language as keyof typeof event.name]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {formatDate(event.date)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {event.venue[language as keyof typeof event.venue]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        ${event.price}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-duck-yellow/10 mr-2"
                                                    >
                                                        {t(TranslationConstants.COMMON.BUTTONS.EDIT)}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 dark:text-red-400 hover:text-red-900 hover:bg-red-100 dark:hover:bg-red-900/10"
                                                        onClick={() => handleDeleteClick(event._id)}
                                                    >
                                                        {t(TranslationConstants.COMMON.BUTTONS.DELETE)}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                {t(TranslationConstants.EVENTS.NO_EVENTS)}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {events && events.data.length > 0 && (
                                <div className="flex justify-between items-center mt-4 px-6">
                                    <Button
                                        variant="outline"
                                        onClick={handlePreviousPage}
                                        disabled={!events || events.pagination.page === 0}
                                        className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                                    >
                                        {t(TranslationConstants.COMMON.BUTTONS.PREVIOUS)}
                                    </Button>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {t(TranslationConstants.COMMON.BUTTONS.PAGE)} {events.pagination.page + 1} {t(TranslationConstants.COMMON.BUTTONS.OF)} {events.pagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={handleNextPage}
                                        disabled={!events || !events.pagination.hasMore}
                                        className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                                    >
                                        {t(TranslationConstants.COMMON.BUTTONS.NEXT)}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <DeleteConfirmationDialog
                isOpen={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
}

export default EventsTable;