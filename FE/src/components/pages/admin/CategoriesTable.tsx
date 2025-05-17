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
import CreateTagDialog from "./CreateTagDialog";
import UpdateTagDialog from "./UpdateTagDialog";
import { Pencil, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CategoriesTableProps {
    setCategoriesCount: React.Dispatch<React.SetStateAction<number>>;
    categoriesCount: number;
}

const CategoriesTable = ({ setCategoriesCount, categoriesCount }: CategoriesTableProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<GetFullTagsResponseDto>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [categoryToUpdate, setCategoryToUpdate] = useState<GetFullTagsResponseDto[0] | null>(null);
    const { toast } = useToast();
    const { t, i18n } = useTranslation();
    const language = i18n.language as LanguagesConstants;

    // Fetch categories
    const fetchCategories = async () => {
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
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteClick = (categoryId: string) => {
        setCategoryToDelete(categoryId);
        setDeleteDialogOpen(true);
    };

    const handleUpdateClick = (category: GetFullTagsResponseDto[0]) => {
        setCategoryToUpdate(category);
        setUpdateDialogOpen(true);
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
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        {t(TranslationConstants.ADMIN.CATEGORIES.CREATE_CATEGORY)}
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="rounded-md border border-duck-yellow/20 bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-muted/50">
                                        <TableHead className="text-right rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.CATEGORIES.NAME)}
                                        </TableHead>
                                        <TableHead className="text-right rtl:text-right ltr:text-left">
                                            {t(TranslationConstants.CATEGORIES.COLOR)}
                                        </TableHead>
                                        <TableHead className="text-center w-[200px]">
                                            {t(TranslationConstants.COMMON.BUTTONS.ACTIONS)}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories && categories.length > 0 ? (
                                        categories.map((category) => (
                                            <TableRow key={category._id} className="hover:bg-muted/50">
                                                <TableCell className="text-right rtl:text-right ltr:text-left">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {category.name[language as keyof typeof category.name]}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right rtl:text-right ltr:text-left">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-6 h-6 rounded-full rtl:ml-2 ltr:mr-2"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {category.color}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex justify-center gap-2 rtl:gap-2 rtl:flex-row-reverse">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleUpdateClick(category)}
                                                            className="border-duck-yellow/20 hover:bg-duck-yellow/10"
                                                            title={t(TranslationConstants.COMMON.BUTTONS.EDIT)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(category._id)}
                                                            className="border-red-500/20 hover:bg-red-500/10 text-red-500"
                                                            title={t(TranslationConstants.COMMON.BUTTONS.DELETE)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-gray-500 dark:text-gray-400">
                                                {t(TranslationConstants.CATEGORIES.NO_CATEGORIES)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
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

            <CreateTagDialog
                isOpen={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSuccess={fetchCategories}
            />

            {categoryToUpdate && (
                <UpdateTagDialog
                    isOpen={updateDialogOpen}
                    onClose={() => {
                        setUpdateDialogOpen(false);
                        setCategoryToUpdate(null);
                    }}
                    onSuccess={fetchCategories}
                    tag={categoryToUpdate}
                />
            )}
        </>
    );
}

export default CategoriesTable;