import { useTranslation } from "react-i18next";
import { TranslationConstants } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

interface ImageUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onFileSelect?: (file: File | null) => void;
    error?: string;
}

const ImageUpload = ({ onFileSelect, error, className, ...props }: ImageUploadProps) => {
    const { t } = useTranslation();
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isPreviewing, setIsPreviewing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<File | null>(null);

    const validateImage = (file: File): Promise<{ isValid: boolean; error?: string }> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (file.size > 1024 * 1024) {
                        resolve({ isValid: false, error: t(TranslationConstants.VALIDATION.EVENT.IMAGE_URL.SIZE) });
                        return;
                    }

                    const [width, height] = [img.width, img.height];
                    const minWidth = 400;
                    const minHeight = 300;
                    if (width < minWidth || height < minHeight) {
                        resolve({ 
                            isValid: false, 
                            error: t(TranslationConstants.VALIDATION.EVENT.IMAGE_URL.MIN_DIMENSIONS, { 
                                width: minWidth, 
                                height: minHeight 
                            })
                        });
                        return;
                    }
                    resolve({ isValid: true });
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedFileName("");
            setPreviewUrl("");
            setIsPreviewing(false);
            fileRef.current = null;
            onFileSelect?.(null);
            return;
        }

        const { isValid, error } = await validateImage(file);
        if (!isValid) {
            setSelectedFileName("");
            setPreviewUrl("");
            setIsPreviewing(false);
            fileRef.current = null;
            onFileSelect?.(null);
            console.error(error);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setIsPreviewing(true);
        fileRef.current = file;
    };

    const handleCancel = () => {
        setIsPreviewing(false);
        setPreviewUrl("");
        setSelectedFileName("");
        fileRef.current = null;
        if (fileInputRef.current) fileInputRef.current.value = "";
        onFileSelect?.(null);
    };

    const handleSubmit = () => {
        if (fileRef.current) {
            setSelectedFileName(fileRef.current.name);
            onFileSelect?.(fileRef.current);
        }
        setIsPreviewing(false);
    };

    return (
        <div className="relative">
            <label className="block">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="custom-image-upload"
                    ref={fileInputRef}
                    {...props}
                />
                <div
                    className={cn(
                        "flex items-center border border-duck-yellow/20 rounded-md px-3 py-2 bg-transparent",
                        "gap-3",
                        error && "border-red-500",
                        "focus-within:border-duck-yellow focus-within:ring-1 focus-within:ring-duck-yellow",
                        "flex-row-reverse",
                        "max-w-md",
                        "w-full",
                        className
                    )}
                >
                    <span
                        className="flex-1 min-w-0 text-duck-yellow text-sm truncate select-none rtl:text-right ltr:text-left"
                    >
                        {selectedFileName || t(TranslationConstants.EVENTS.IMAGE)}
                    </span>
                    <label
                        htmlFor="custom-image-upload"
                        className="px-4 py-2 bg-duck-yellow text-duck-brown rounded-full text-sm font-semibold cursor-pointer hover:bg-duck-yellow/80 transition-colors"
                    >
                        {t(TranslationConstants.COMMON.BUTTONS.CHOOSE_FILE)}
                    </label>
                </div>
            </label>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            <Dialog open={isPreviewing} onOpenChange={setIsPreviewing}>
                <DialogContent className="sm:max-w-[800px] dark:bg-card border-duck-yellow/20">
                    <DialogHeader>
                        <DialogTitle className="text-foreground rtl:text-right ltr:text-left">
                            {t(TranslationConstants.EVENTS.IMAGE)}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 flex justify-center">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, border: '1px solid #ffe066' }}
                            />
                        )}
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                        >
                            {t(TranslationConstants.COMMON.BUTTONS.CANCEL)}
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                        >
                            {t(TranslationConstants.COMMON.BUTTONS.SUBMIT)}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImageUpload;