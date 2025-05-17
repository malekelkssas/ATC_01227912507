import { useTranslation } from "react-i18next";
import { TranslationConstants } from "@/utils/constants";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

const DeleteConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm
}: DeleteConfirmationDialogProps) => {
    const { t } = useTranslation();
    const dialogRef = useRef<HTMLDivElement>(null);

    useClickOutside(dialogRef, () => {
        if (isOpen) {
            onClose();
        }
    });

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent ref={dialogRef}>
                <AlertDialogHeader className="rtl:text-right ltr:text-left">
                    <AlertDialogTitle className="text-foreground">
                        {t(TranslationConstants.COMMON.MESSAGES.DELETE_CONFIRMATION_TITLE)}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        {t(TranslationConstants.COMMON.MESSAGES.DELETE_CONFIRMATION_DESCRIPTION)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="rtl:flex-row-reverse ltr:flex-row gap-2">
                    <AlertDialogCancel className="border-duck-yellow/20 hover:bg-duck-yellow/10 rtl:ml-0 ltr:mr-0">
                        {t(TranslationConstants.COMMON.BUTTONS.CANCEL)}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white rtl:ml-0 ltr:mr-0"
                    >
                        {t(TranslationConstants.COMMON.BUTTONS.DELETE)}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog; 