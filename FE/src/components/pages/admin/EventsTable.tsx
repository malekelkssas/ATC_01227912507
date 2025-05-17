import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PagesRoutesConstants, TranslationConstants } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/api/services";
import { Loader2, Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants } from "@/utils/constants";
import type { ErrorResponse } from "@/types";
import type { GetEventAdminResponseDto, PaginationResponseDto } from "@/types/dtos";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import CreateEventDialog from "./CreateEventDialog";
import UpdateEventDialog from "./UpdateEventDialog";
import { useNavigate } from "react-router-dom";
import { LanguagesConstants } from '@/utils/constants';

const EventsTable = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as LanguagesConstants;
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<GetEventAdminResponseDto | null>(null);

    const { data: events, isLoading, refetch, error } = useQuery({
        queryKey: ["events", currentPage, searchQuery],
        queryFn: async () => {
                const response = await EventService.getFullEvents({ page: currentPage - 1, limit: 10 }) as PaginationResponseDto<GetEventAdminResponseDto>;
                return response;
        },
    });

    const handleDelete = async () => {
        if (!selectedEvent) return;

        try {
            await EventService.deleteEvent(selectedEvent._id);
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
                description: t(TranslationConstants.COMMON.MESSAGES.SUCCESS_DESCRIPTION),
                variant: ToastVariantsConstants.SUCCESS,
            });
            refetch();
        } catch (error) {
            const errorResponse = error as ErrorResponse;
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                description: errorResponse.response?.data?.message || t(TranslationConstants.COMMON.MESSAGES.ERROR),
                variant: ToastVariantsConstants.ERROR,
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setSelectedEvent(null);
        }
    };

    const handleUpdate = (event: GetEventAdminResponseDto) => {
        setSelectedEvent(event);
        setIsUpdateDialogOpen(true);
    };

    const handleDeleteClick = (event: GetEventAdminResponseDto) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    console.log(events?.pagination.total);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t(TranslationConstants.EVENTS.SEARCH_EVENTS)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow"
                    />
                </div>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="w-full sm:w-auto bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t(TranslationConstants.ADMIN.EVENTS.CREATE_EVENT)}
                </Button>
            </div>

            <div className="rounded-md border border-duck-yellow/20 bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-muted/50">
                            <TableHead className="text-right rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.TITLE)}</TableHead>
                            <TableHead className="text-right rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.DESCRIPTION)}</TableHead>
                            <TableHead className="text-right rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.LOCATION)}</TableHead>
                            <TableHead className="text-right rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.PRICE)}</TableHead>
                            <TableHead className="text-right rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.DATE)}</TableHead>
                            <TableHead className="text-center w-[200px]">{t(TranslationConstants.COMMON.BUTTONS.ACTIONS)}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-red-500">
                                    {(error as ErrorResponse)?.response?.data?.message || error.message || t(TranslationConstants.COMMON.MESSAGES.ERROR)}
                                </TableCell>
                            </TableRow>
                        ) : !events ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    {t(TranslationConstants.COMMON.MESSAGES.ERROR)}
                                </TableCell>
                            </TableRow>
                        ) : events?.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    {t(TranslationConstants.EVENTS.NO_EVENTS)}
                                </TableCell>
                            </TableRow>
                        ) : (
                            events.data.map((event: GetEventAdminResponseDto) => (
                                <TableRow key={event._id} className="hover:bg-muted/50">
                                    <TableCell className="text-right rtl:text-right ltr:text-left">{event.name[lang as keyof typeof event.name]}</TableCell>
                                    <TableCell className="text-right rtl:text-right ltr:text-left">{event.description[lang as keyof typeof event.description]}</TableCell>
                                    <TableCell className="text-right rtl:text-right ltr:text-left">{event.venue[lang as keyof typeof event.venue]}</TableCell>
                                    <TableCell className="text-right rtl:text-right ltr:text-left">{event.price}</TableCell>
                                    <TableCell className="text-right rtl:text-right ltr:text-left">{new Date(event.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2 rtl:flex-row-reverse">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => navigate(`${PagesRoutesConstants.EVENTS}/${event._id}`)}
                                                className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                                                title={t(TranslationConstants.EVENTS.DETAILS)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleUpdate(event)}
                                                className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                                                title={t(TranslationConstants.COMMON.BUTTONS.EDIT)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDeleteClick(event)}
                                                className="border-red-500/20 hover:bg-red-500/10 text-red-500"
                                                title={t(TranslationConstants.COMMON.BUTTONS.DELETE)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    {t(TranslationConstants.EVENTS.TOTAL_EVENTS)} {
                        events?.pagination.total || 0
                    }
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                    >
                        {t(TranslationConstants.COMMON.BUTTONS.PREVIOUS)}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={!events?.pagination.hasMore}
                        className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                    >
                        {t(TranslationConstants.COMMON.BUTTONS.NEXT)}
                    </Button>
                </div>
            </div>

            <CreateEventDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSuccess={refetch}
            />

            {selectedEvent && (
                <UpdateEventDialog
                    isOpen={isUpdateDialogOpen}
                    onClose={() => {
                        setIsUpdateDialogOpen(false);
                        setSelectedEvent(null);
                    }}
                    onSuccess={refetch}
                    event={selectedEvent}
                />
            )}

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedEvent(null);
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default EventsTable;