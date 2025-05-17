import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TranslationConstants } from "@/utils/constants";
import { CreateTagZod, type CreateTagDto } from "@/types/dtos/tag.dto";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TagService } from "@/api/services";
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants } from "@/utils/constants";
import type { ErrorResponse } from "@/types";
import { TagFields } from "@/utils/constants/forms";

interface CreateTagDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateTagDialog = ({ isOpen, onClose, onSuccess }: CreateTagDialogProps) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<CreateTagDto>({
        resolver: zodResolver(CreateTagZod),
        defaultValues: {
            [TagFields.NAME]: { en: '', ar: '' },
            [TagFields.COLOR]: '#FFFF00',
        }
    });

    const colorValue = watch(TagFields.COLOR);

    const onSubmit = async (data: CreateTagDto) => {
        setIsLoading(true);
        try {
            await TagService.createTag(data);
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
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] dark:bg-card border-duck-yellow/20">
                <DialogHeader>
                    <DialogTitle className="text-foreground rtl:text-right ltr:text-left rtl:pr-10">
                        {t(TranslationConstants.ADMIN.CATEGORIES.CREATE_CATEGORY)}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t(TranslationConstants.CATEGORIES.NAME)} (EN)
                            </label>
                            <Input
                                {...register(TagFields.EN_NAME)}
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
                                {t(TranslationConstants.CATEGORIES.NAME)} (AR)
                            </label>
                            <Input
                                {...register(TagFields.AR_NAME)}
                                className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.name?.ar ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.name?.ar && (
                                <p className="mt-1 text-sm text-red-500">{t(errors.name.ar.message || '')}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            {t(TranslationConstants.CATEGORIES.COLOR)}
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="color"
                                value={colorValue}
                                onChange={e => setValue(TagFields.COLOR, e.target.value, { shouldValidate: true })}
                                className="w-12 h-10 p-1 border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow"
                            />
                            <Input
                                value={colorValue}
                                onChange={e => setValue(TagFields.COLOR, e.target.value, { shouldValidate: true })}
                                className={`flex-1 border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
                                    errors.color ? 'border-red-500' : ''
                                }`}
                            />
                        </div>
                        {errors.color && (
                            <p className="mt-1 text-sm text-red-500">{t(errors.color.message || '')}</p>
                        )}
                    </div>

                    <DialogFooter>
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
                            disabled={isLoading}
                            className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t(TranslationConstants.COMMON.LOADING)}
                                </>
                            ) : (
                                t(TranslationConstants.COMMON.BUTTONS.CREATE)
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTagDialog; 