import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TranslationConstants, LanguagesConstants } from "@/utils/constants";
import { CreateEventZod, type CreateEventDto } from "@/types/dtos";
import { Loader2, Check, ChevronsUpDown, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { EventService, TagService } from "@/api/services";
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants } from "@/utils/constants";
import type { ErrorResponse } from "@/types";
import { UPLOAD_IMAGES_CONSTANTS } from "@/utils/constants";
import type { GetFullTagsResponseDto } from "@/types/dtos";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EventFields } from "@/utils/constants";
import ImageUpload from "@/components/ui/image-upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { THEME } from "@/types";
import { useTheme } from "next-themes";

interface CreateEventDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateEventDialog = ({ isOpen, onClose, onSuccess }: CreateEventDialogProps) => {
    const { t, i18n } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tags, setTags] = useState<GetFullTagsResponseDto>([]);
    const [isLoadingTags, setIsLoadingTags] = useState(false);
    const [open, setOpen] = useState(false);
    const lang = i18n.language as LanguagesConstants;
    const { theme } = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<CreateEventDto>({
        resolver: zodResolver(CreateEventZod),
        defaultValues: {
            [EventFields.NAME]: { en: '', ar: '' },
            [EventFields.DESCRIPTION]: { en: '', ar: '' },
            [EventFields.VENUE]: { en: '', ar: '' },
            [EventFields.CATEGORY]: [],
            [EventFields.PRICE]: 0,
            [EventFields.DATE]: new Date(),
        }
    });

    const selectedCategories = watch(EventFields.CATEGORY);

    useEffect(() => {
        const fetchTags = async () => {
            setIsLoadingTags(true);
            try {
                const response = await TagService.getFullTags() as GetFullTagsResponseDto;
                setTags(response);
            } catch (error) {
                const errorResponse = error as ErrorResponse;
                toast({
                    title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                    description: errorResponse.response?.data?.message || t(TranslationConstants.COMMON.MESSAGES.ERROR),
                    variant: ToastVariantsConstants.ERROR,
                });
            } finally {
                setIsLoadingTags(false);
            }
        };
        fetchTags();
    }, []);

    const onSubmit = async (data: CreateEventDto) => {
        if (!selectedImage) {
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                description: t(TranslationConstants.VALIDATION.EVENT.IMAGE_URL.REQUIRED),
                variant: ToastVariantsConstants.ERROR,
            });
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append(UPLOAD_IMAGES_CONSTANTS.IMAGE_FIELD_NAME, selectedImage);
            formData.append(UPLOAD_IMAGES_CONSTANTS.DATA_FIELD_NAME, JSON.stringify(data));

            await EventService.createEvent(formData);
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
                description: t(TranslationConstants.COMMON.MESSAGES.SUCCESS_DESCRIPTION),
                variant: ToastVariantsConstants.SUCCESS,
            });
            onSuccess();
            handleClose();
        } catch (error) {
            const errorResponse = error as ErrorResponse;
            toast({
                title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
                description: errorResponse.response?.data?.message || t(TranslationConstants.COMMON.MESSAGES.ERROR),
                variant: ToastVariantsConstants.ERROR,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setSelectedImage(null);
        onClose();
    };

    const handleCategorySelect = (tagId: string) => {
        const currentCategories = selectedCategories || [];
        if (currentCategories.includes(tagId)) {
            setValue(EventFields.CATEGORY, currentCategories.filter(id => id !== tagId));
        } else {
            setValue(EventFields.CATEGORY, [...currentCategories, tagId]);
        }
    };

    const removeCategory = (tagId: string) => {
        const currentCategories = selectedCategories || [];
        setValue(EventFields.CATEGORY, currentCategories.filter(id => id !== tagId));
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] dark:bg-card border-duck-yellow/20">
                <DialogHeader>
                    <DialogTitle className="text-foreground rtl:text-right ltr:text-left rtl:pr-10">
                        {t(TranslationConstants.ADMIN.EVENTS.CREATE_EVENT)}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.NAME)} (EN)
                            </label>
                            <Input
                                {...register(EventFields.EN_NAME)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.name?.en ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.name?.en && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.name.en.message || '')}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.NAME)} (AR)
                            </label>
                            <Input
                                {...register(EventFields.AR_NAME)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.name?.ar ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.name?.ar && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.name.ar.message || '')}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.DESCRIPTION)} (EN)
                            </label>
                            <Textarea
                                {...register(EventFields.EN_DESCRIPTION)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.description?.en ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.description?.en && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.description.en.message || '')}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.DESCRIPTION)} (AR)
                            </label>
                            <Textarea
                                {...register(EventFields.AR_DESCRIPTION)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.description?.ar ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.description?.ar && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.description.ar.message || '')}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.LOCATION)} (EN)
                            </label>
                            <Input
                                {...register(EventFields.EN_VENUE)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.venue?.en ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.venue?.en && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.venue.en.message || '')}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.LOCATION)} (AR)
                            </label>
                            <Input
                                {...register(EventFields.AR_VENUE)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.venue?.ar ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.venue?.ar && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.venue.ar.message || '')}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.PRICE)}
                            </label>
                            <Input
                                type="number"
                                {...register(EventFields.PRICE, { valueAsNumber: true })}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.price ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.price.message || '')}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.EVENTS.DATE)}
                            </label>
                            <DatePicker
                                selected={watch(EventFields.DATE)}
                                onChange={(date) => setValue(EventFields.DATE, date || new Date())}
                                showTimeSelect
                                dateFormat="Pp"
                                className={`w-full border border-duck-yellow/20 rounded-md px-3 py-2 focus:border-duck-yellow focus:ring-duck-yellow
                                    ${theme === THEME.DARK ? "bg-background text-duck-yellow" : "bg-[#fffbe6] text-black"}
                                `}
                                calendarClassName={theme === THEME.DARK ? "dark-datepicker" : "light-datepicker"}
                                popperClassName={theme === THEME.DARK ? "dark-datepicker-popper" : "light-datepicker-popper"}
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.date.message || '')}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            {t(TranslationConstants.EVENTS.CATEGORY)}
                        </label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between border-duck-yellow/20 hover:bg-duck-yellow/10"
                                >
                                    {isLoadingTags ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            {selectedCategories?.length > 0
                                                ? `${selectedCategories.length} ${t(TranslationConstants.EVENTS.SELECTED)}`
                                                : t(TranslationConstants.EVENTS.SELECT_CATEGORIES)}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 rtl:text-right ltr:text-left">
                                <Command className="rtl:text-right ltr:text-left">
                                    <CommandInput placeholder={t(TranslationConstants.EVENTS.SEARCH_CATEGORIES)} className="rtl:text-right ltr:text-left" />
                                    <CommandEmpty className="rtl:text-right ltr:text-left">{t(TranslationConstants.EVENTS.NO_CATEGORIES)}</CommandEmpty>
                                    <CommandGroup className="rtl:text-right ltr:text-left">
                                        {tags.map((tag) => (
                                            <CommandItem
                                                key={tag._id}
                                                onSelect={() => handleCategorySelect(tag._id)}
                                                className="flex items-center gap-2 rtl:flex-row-reverse"
                                            >
                                                <div
                                                    className={cn(
                                                        "flex h-4 w-4 items-center justify-center rounded-sm border border-duck-yellow/20",
                                                        selectedCategories?.includes(tag._id)
                                                            ? "bg-duck-yellow text-duck-brown"
                                                            : "opacity-50"
                                                    )}
                                                >
                                                    {selectedCategories?.includes(tag._id) && (
                                                        <Check className="h-3 w-3" />
                                                    )}
                                                </div>
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: tag.color }}
                                                />
                                                <span className="flex-1">{tag.name[lang as keyof typeof tag.name]}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <div className="flex flex-wrap gap-2 mt-2 rtl:flex-row-reverse">
                            {selectedCategories?.map((tagId) => {
                                const tag = tags.find((t) => t._id === tagId);
                                if (!tag) return null;
                                return (
                                    <Badge
                                        key={tagId}
                                        variant="secondary"
                                        className="flex items-center gap-1 bg-duck-yellow/10 hover:bg-duck-yellow/20 rtl:flex-row-reverse"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span className="flex-1">{tag.name[lang as keyof typeof tag.name]}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeCategory(tagId)}
                                            className="hover:text-red-500 rtl:mr-1 ltr:ml-1"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                );
                            })}
                        </div>
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">{t(errors.category.message || '')}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            {t(TranslationConstants.EVENTS.IMAGE)}
                        </label>
                        <ImageUpload
                            onFileSelect={setSelectedImage}
                        />
                    </div>

                    <DialogFooter className="rtl:flex-row-reverse gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                        >
                            {t(TranslationConstants.COMMON.BUTTONS.CANCEL)}
                        </Button>
                        <Button
                            type="submit"
                            className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="rtl:ml-2 ltr:mr-2 h-4 w-4 animate-spin" />
                                    {t(TranslationConstants.COMMON.LOADING)}
                                </>
                            ) : (
                                t(TranslationConstants.ADMIN.EVENTS.CREATE_EVENT)
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventDialog; 