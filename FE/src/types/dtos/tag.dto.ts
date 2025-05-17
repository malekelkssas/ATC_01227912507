import { z } from 'zod';
import { LanguageZod } from './language.dto';
import { TranslationConstants } from '@/utils/constants';


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

export const GetFullTagsResponseArrayZod = z.array(GetFullTagsResponseZod);

export type GetFullTagsResponseDto = z.infer<typeof GetFullTagsResponseArrayZod>;

// create tag
export const CreateTagZod = z.object({
    name: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.TAG.NAME.EN.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.TAG.NAME.EN.MIN_LENGTH)
          .max(10, TranslationConstants.VALIDATION.TAG.NAME.EN.MAX_LENGTH),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.TAG.NAME.AR.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.TAG.NAME.AR.MIN_LENGTH)
          .max(10, TranslationConstants.VALIDATION.TAG.NAME.AR.MAX_LENGTH),
    }, {
        required_error: TranslationConstants.VALIDATION.TAG.NAME.REQUIRED_OBJECT,
        invalid_type_error: TranslationConstants.VALIDATION.TAG.NAME.INVALID_TYPE
    }),
    color: z.string({
        required_error: TranslationConstants.VALIDATION.TAG.COLOR.REQUIRED,
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, TranslationConstants.VALIDATION.TAG.COLOR.INVALID_FORMAT)
});

export type CreateTagDto = z.infer<typeof CreateTagZod>;

export const CreateTagResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    color: z.string(),
});

export type CreateTagResponseDto = z.infer<typeof CreateTagResponseZod>;

// Update Tag
export const UpdateTagZod = z.object({
    name: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.TAG.NAME.EN.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.TAG.NAME.EN.MIN_LENGTH)
          .max(10, TranslationConstants.VALIDATION.TAG.NAME.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.TAG.NAME.AR.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.TAG.NAME.AR.MIN_LENGTH)
          .max(10, TranslationConstants.VALIDATION.TAG.NAME.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: TranslationConstants.VALIDATION.TAG.NAME.INVALID_TYPE
    }).refine((data) => Object.keys(data).length > 0, {
        message: TranslationConstants.VALIDATION.TAG.NAME.EMPTY
    }).optional(),
    color: z.string({
        required_error: TranslationConstants.VALIDATION.TAG.COLOR.REQUIRED,
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, TranslationConstants.VALIDATION.TAG.COLOR.INVALID_FORMAT)
      .optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: TranslationConstants.VALIDATION.TAG.UPDATE.EMPTY
});

export type UpdateTagDto = z.infer<typeof UpdateTagZod>;

export const UpdateTagResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    color: z.string(),
});

export type UpdateTagResponseDto = z.infer<typeof UpdateTagResponseZod>;