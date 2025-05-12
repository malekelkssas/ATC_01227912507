import { z } from 'zod';
import { LanguageZod } from './language.dto';

// Create Tag
export const CreateTagZod = z.object({
    name: z.object({
        en: z.string({
            required_error: "English name is required",
        }).min(3, "English name must be at least 3 characters long").max(10, "English name must be less than 10 characters"),
        ar: z.string({
            required_error: "Arabic name is required",
        }).min(3, "Arabic name must be at least 3 characters long").max(10, "Arabic name must be less than 10 characters"),
    }, {
        required_error: "Name must be an object with 'en' and 'ar' properties",
        invalid_type_error: "Name must be an object with 'en' and 'ar' properties"
    }),
    color: z.string({
        required_error: "Color is required",
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format").default("#FFFF00"),
});

export type CreateTagDto = z.infer<typeof CreateTagZod>;

export const CreateTagResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    color: z.string(),
});

export type CreateTagResponseDto = z.infer<typeof CreateTagResponseZod>;

// Get Tags
export const GetTagResponseZod = z.object({
    _id: z.string(),
    name: z.string(),
    color: z.string(),
});

export type GetTagResponseDto = z.infer<typeof GetTagResponseZod>;

export const GetTagsResponseZod = z.array(GetTagResponseZod);

export type GetTagsResponseDto = z.infer<typeof GetTagsResponseZod>;

// Get Full Tags (for admin)
export const GetFullTagsResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    color: z.string(),
});

export type GetFullTagsResponseDto = z.infer<typeof GetFullTagsResponseZod>;
