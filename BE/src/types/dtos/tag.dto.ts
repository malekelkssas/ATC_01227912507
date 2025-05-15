import { z } from 'zod';
import { LanguageZod } from './language.dto';
import { VALIDATION_MESSAGES } from '@/utils/constants';

// Create Tag
export const CreateTagZod = z.object({
    name: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.TAG.NAME.EN.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.TAG.NAME.EN.MIN_LENGTH)
          .max(10, VALIDATION_MESSAGES.TAG.NAME.EN.MAX_LENGTH),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.TAG.NAME.AR.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.TAG.NAME.AR.MIN_LENGTH)
          .max(10, VALIDATION_MESSAGES.TAG.NAME.AR.MAX_LENGTH),
    }, {
        required_error: VALIDATION_MESSAGES.TAG.NAME.REQUIRED_OBJECT,
        invalid_type_error: VALIDATION_MESSAGES.TAG.NAME.INVALID_TYPE
    }),
    color: z.string({
        required_error: VALIDATION_MESSAGES.TAG.COLOR.REQUIRED,
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, VALIDATION_MESSAGES.TAG.COLOR.INVALID_FORMAT)
      .default("#FFFF00"),
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

export const GetFullTagsResponseArrayZod = z.array(GetFullTagsResponseZod);

export type GetFullTagsResponseDto = z.infer<typeof GetFullTagsResponseArrayZod>;


// Update Tag
export const UpdateTagZod = z.object({
    name: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.TAG.NAME.EN.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.TAG.NAME.EN.MIN_LENGTH)
          .max(10, VALIDATION_MESSAGES.TAG.NAME.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.TAG.NAME.AR.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.TAG.NAME.AR.MIN_LENGTH)
          .max(10, VALIDATION_MESSAGES.TAG.NAME.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: VALIDATION_MESSAGES.TAG.NAME.INVALID_TYPE
    }).refine((data) => Object.keys(data).length > 0, {
        message: VALIDATION_MESSAGES.TAG.NAME.EMPTY
    }).optional(),
    color: z.string({
        required_error: VALIDATION_MESSAGES.TAG.COLOR.REQUIRED,
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, VALIDATION_MESSAGES.TAG.COLOR.INVALID_FORMAT)
      .optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.TAG.UPDATE.EMPTY
});

export type UpdateTagDto = z.infer<typeof UpdateTagZod>;

export const UpdateTagResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    color: z.string(),
});

export type UpdateTagResponseDto = z.infer<typeof UpdateTagResponseZod>;