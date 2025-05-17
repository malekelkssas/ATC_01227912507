import { z } from 'zod';
import { GetFullTagsResponseZod, GetTagResponseZod } from './tag.dto';
import { LanguageZod } from './language.dto';
import { TranslationConstants } from '@/utils/constants';

// Get Events for public
export const GetEventResponseZod = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.array(GetTagResponseZod),
    venue: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    date: z.date(),
});

export type GetEventResponseDto = z.infer<typeof GetEventResponseZod>;


// Get Events for authenticated user
export const GetFullEventResponseZod = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.array(GetTagResponseZod),
    venue: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    date: z.date(),
    isBooked: z.boolean(),
});

export type GetFullEventResponseDto = z.infer<typeof GetFullEventResponseZod>;

export const GetFullEventsResponseZod = z.array(GetFullEventResponseZod);

export type GetFullEventsResponseDto = z.infer<typeof GetFullEventsResponseZod>;


// Get Events for admin
export const GetEventAdminResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    description: LanguageZod,
    category: z.array(GetFullTagsResponseZod),
    venue: LanguageZod,
    imageUrl: z.string(),
    price: z.number(),
    date: z.date()
});

export type GetEventAdminResponseDto = z.infer<typeof GetEventAdminResponseZod>;

export const GetEventsAdminResponseZod = z.array(GetEventAdminResponseZod);

export type GetEventsAdminResponseDto = z.infer<typeof GetEventsAdminResponseZod>;


// update event
export const UpdateEventZod = z.object({
    name: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.NAME.EN.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.NAME.EN.INVALID_TYPE,
        }).min(3, TranslationConstants.VALIDATION.EVENT.NAME.EN.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.NAME.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.NAME.AR.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.NAME.AR.INVALID_TYPE,
        }).min(3, TranslationConstants.VALIDATION.EVENT.NAME.AR.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.NAME.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.NAME.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: TranslationConstants.VALIDATION.EVENT.NAME.EMPTY }
    ).optional(),
    description: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.INVALID_TYPE,
        }).min(10, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.MIN_LENGTH)
          .max(1000, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.INVALID_TYPE,
        }).min(10, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.MIN_LENGTH)
          .max(1000, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EMPTY }
    ).optional(),
    category: z.array(z.string()).min(1, TranslationConstants.VALIDATION.EVENT.CATEGORY.MIN_ITEMS)
      .max(4, TranslationConstants.VALIDATION.EVENT.CATEGORY.MAX_ITEMS)
      .optional(),
    venue: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.VENUE.EN.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.VENUE.EN.INVALID_TYPE,
        }).min(3, TranslationConstants.VALIDATION.EVENT.VENUE.EN.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.VENUE.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.VENUE.AR.REQUIRED,
            invalid_type_error: TranslationConstants.VALIDATION.EVENT.VENUE.AR.INVALID_TYPE,
        }).min(3, TranslationConstants.VALIDATION.EVENT.VENUE.AR.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.VENUE.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.VENUE.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: TranslationConstants.VALIDATION.EVENT.VENUE.EMPTY }
    ).optional(),
    price: z.number({
        required_error: TranslationConstants.VALIDATION.EVENT.PRICE.REQUIRED,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.PRICE.INVALID_TYPE,
    }).optional(),
    date: z.coerce.date({
        required_error: TranslationConstants.VALIDATION.EVENT.DATE.REQUIRED,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.DATE.INVALID_TYPE,
    }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: TranslationConstants.VALIDATION.EVENT.UPDATE.EMPTY
});

export type UpdateEventDto = z.infer<typeof UpdateEventZod>;

// create event

export const CreateEventZod = z.object({
    name: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.NAME.EN.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.EVENT.NAME.EN.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.NAME.EN.MAX_LENGTH),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.NAME.AR.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.EVENT.NAME.AR.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.NAME.AR.MAX_LENGTH),
    }, {
        required_error: TranslationConstants.VALIDATION.EVENT.NAME.REQUIRED_OBJECT,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.NAME.INVALID_TYPE,
    }),
    description: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.REQUIRED,
        }).min(10, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.MIN_LENGTH)
          .max(1000, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.EN.MAX_LENGTH),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.REQUIRED,
        }).min(10, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.MIN_LENGTH)
          .max(1000, TranslationConstants.VALIDATION.EVENT.DESCRIPTION.AR.MAX_LENGTH),
    }, {
        required_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.REQUIRED_OBJECT,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.DESCRIPTION.INVALID_TYPE,
    }),
    category: z.array(z.string()).min(1, TranslationConstants.VALIDATION.EVENT.CATEGORY.MIN_ITEMS)
      .max(4, TranslationConstants.VALIDATION.EVENT.CATEGORY.MAX_ITEMS),
    venue: z.object({
        en: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.VENUE.EN.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.EVENT.VENUE.EN.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.VENUE.EN.MAX_LENGTH),
        ar: z.string({
            required_error: TranslationConstants.VALIDATION.EVENT.VENUE.AR.REQUIRED,
        }).min(3, TranslationConstants.VALIDATION.EVENT.VENUE.AR.MIN_LENGTH)
          .max(30, TranslationConstants.VALIDATION.EVENT.VENUE.AR.MAX_LENGTH),
    }, {
        required_error: TranslationConstants.VALIDATION.EVENT.VENUE.REQUIRED_OBJECT,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.VENUE.INVALID_TYPE,
    }),
    price: z.number({
        required_error: TranslationConstants.VALIDATION.EVENT.PRICE.REQUIRED,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.PRICE.INVALID_TYPE,
    }).min(0, TranslationConstants.VALIDATION.EVENT.PRICE.MIN),
    date: z.coerce.date({
        required_error: TranslationConstants.VALIDATION.EVENT.DATE.REQUIRED,
        invalid_type_error: TranslationConstants.VALIDATION.EVENT.DATE.INVALID_TYPE,
    }),
});

export type CreateEventDto = z.infer<typeof CreateEventZod>;

export const CreateEventResponseZod = z.object({
    _id: z.string(),
    name: LanguageZod,
    description: LanguageZod,
    category: z.array(GetFullTagsResponseZod),
    venue: LanguageZod,
    imageUrl: z.string(),
    price: z.number(),
    date: z.date(),
});

export type CreateEventResponseDto = z.infer<typeof CreateEventResponseZod>;