import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TranslationConstants, LanguagesConstants } from "@/utils/constants";
import { TagService } from "@/api/services";
import type { ErrorResponse, GetFullTagsResponseDto } from "@/types";
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants } from "@/utils/constants";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface CategoriesTableProps {
    setCategoriesCount: React.Dispatch<React.SetStateAction<number>>;
    categoriesCount: number;
}

const CategoriesTable = ({ setCategoriesCount, categoriesCount }: CategoriesTableProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<GetFullTagsResponseDto>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const { toast } = useToast();
    const { t, i18n } = useTranslation();
    const language = i18n.language as LanguagesConstants;

    // Fetch categories
    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            try {
                const newCategories = await TagService.getFullTags() as GetFullTagsResponseDto;
                setCategories(newCategories);
                if (categoriesCount !== newCategories.length) {
                    setCategoriesCount(newCategories.length);
                }

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
        }
        getCategories();
    }, []);

    const handleDeleteClick = (categoryId: string) => {
        setCategoryToDelete(categoryId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return;

        try {
            await TagService.deleteTag(categoryToDelete);
            setCategories(prev => prev.filter(category => category._id !== categoryToDelete));
            setCategoriesCount(prev => prev - 1);
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
            setCategoryToDelete(null);
        }
    };

    return (
        <>
            <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            {t(TranslationConstants.ADMIN.CATEGORIES.MANAGE_CATEGORIES)}
                        </CardTitle>
                    </div>
                    <Button 
                        className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                    >
                        {t(TranslationConstants.ADMIN.CATEGORIES.CREATE_CATEGORY)}
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
                                            {t(TranslationConstants.CATEGORIES.NAME)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.CATEGORIES.COLOR)}
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center w-[200px]">
                                            {t(TranslationConstants.COMMON.BUTTONS.ACTIONS)}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dark:bg-duck-brown/5 divide-y divide-duck-yellow/10">
                                    {categories && categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/10">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {category.name[language as keyof typeof category.name]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-6 h-6 rounded-full rtl:ml-2 ltr:mr-2"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {category.color}
                                                        </span>
                                                    </div>

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
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
                                                        onClick={() => handleDeleteClick(category._id)}
                                                    >
                                                        {t(TranslationConstants.COMMON.BUTTONS.DELETE)}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                {t(TranslationConstants.CATEGORIES.NO_CATEGORIES)}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <DeleteConfirmationDialog
                isOpen={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
}

export default CategoriesTable;