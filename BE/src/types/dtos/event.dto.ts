import { z } from 'zod';
import { LanguageZod } from './language.dto';
import mongoose from 'mongoose';
import { GetFullTagsResponseZod, GetTagResponseZod } from './tag.dto';
import { UPLOAD_IMAGES_CONSTANTS, VALIDATION_MESSAGES } from '@/utils/constants';

const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|webp)$/i;

const IMAGE_URL_PATTERN = new RegExp(
    `^${UPLOAD_IMAGES_CONSTANTS.IMAGE_PATH}event-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}${ALLOWED_EXTENSIONS.source}$`,
    'i'
);

export const CreateEventZod = z.object({
    name: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.NAME.EN.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.EVENT.NAME.EN.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.NAME.EN.MAX_LENGTH),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.NAME.AR.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.EVENT.NAME.AR.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.NAME.AR.MAX_LENGTH),
    }, {
        required_error: VALIDATION_MESSAGES.EVENT.NAME.REQUIRED_OBJECT,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.NAME.INVALID_TYPE,
    }),
    description: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.REQUIRED,
        }).min(10, VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.MIN_LENGTH)
          .max(1000, VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.MAX_LENGTH),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.REQUIRED,
        }).min(10, VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.MIN_LENGTH)
          .max(1000, VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.MAX_LENGTH),
    }, {
        required_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.REQUIRED_OBJECT,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.INVALID_TYPE,
    }),
    category: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: VALIDATION_MESSAGES.EVENT.CATEGORY.INVALID_ID
    }), {
        required_error: VALIDATION_MESSAGES.EVENT.CATEGORY.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.CATEGORY.INVALID_TYPE,
    }).min(1, VALIDATION_MESSAGES.EVENT.CATEGORY.MIN_ITEMS)
      .max(4, VALIDATION_MESSAGES.EVENT.CATEGORY.MAX_ITEMS),
    venue: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.VENUE.EN.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.EVENT.VENUE.EN.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.VENUE.EN.MAX_LENGTH),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.VENUE.AR.REQUIRED,
        }).min(3, VALIDATION_MESSAGES.EVENT.VENUE.AR.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.VENUE.AR.MAX_LENGTH),
    }, {
        required_error: VALIDATION_MESSAGES.EVENT.VENUE.REQUIRED_OBJECT,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.VENUE.INVALID_TYPE,
    }),
    imageUrl: z.string({
        required_error: VALIDATION_MESSAGES.EVENT.IMAGE_URL.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.IMAGE_URL.INVALID_TYPE,
    }).regex(IMAGE_URL_PATTERN, VALIDATION_MESSAGES.EVENT.IMAGE_URL.INVALID),
    price: z.number({
        required_error: VALIDATION_MESSAGES.EVENT.PRICE.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.PRICE.INVALID_TYPE,
    }),
    date: z.coerce.date({
        required_error: VALIDATION_MESSAGES.EVENT.DATE.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.DATE.INVALID_TYPE,
    }),
}, {
    required_error: VALIDATION_MESSAGES.REQUEST_BODY.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.REQUEST_BODY.INVALID_TYPE,
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

// Update Events
export const UpdateEventZod = z.object({
    name: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.NAME.EN.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.NAME.EN.INVALID_TYPE,
        }).min(3, VALIDATION_MESSAGES.EVENT.NAME.EN.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.NAME.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.NAME.AR.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.NAME.AR.INVALID_TYPE,
        }).min(3, VALIDATION_MESSAGES.EVENT.NAME.AR.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.NAME.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: VALIDATION_MESSAGES.EVENT.NAME.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: VALIDATION_MESSAGES.EVENT.NAME.EMPTY }
    ).optional(),
    description: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.INVALID_TYPE,
        }).min(10, VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.MIN_LENGTH)
          .max(1000, VALIDATION_MESSAGES.EVENT.DESCRIPTION.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.INVALID_TYPE,
        }).min(10, VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.MIN_LENGTH)
          .max(1000, VALIDATION_MESSAGES.EVENT.DESCRIPTION.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: VALIDATION_MESSAGES.EVENT.DESCRIPTION.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: VALIDATION_MESSAGES.EVENT.DESCRIPTION.EMPTY }
    ).optional(),
    category: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: VALIDATION_MESSAGES.EVENT.CATEGORY.INVALID_ID
    }), {
        invalid_type_error: VALIDATION_MESSAGES.EVENT.CATEGORY.INVALID_TYPE,
    }).min(1, VALIDATION_MESSAGES.EVENT.CATEGORY.MIN_ITEMS)
      .max(4, VALIDATION_MESSAGES.EVENT.CATEGORY.MAX_ITEMS)
      .optional(),
    venue: z.object({
        en: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.VENUE.EN.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.VENUE.EN.INVALID_TYPE,
        }).min(3, VALIDATION_MESSAGES.EVENT.VENUE.EN.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.VENUE.EN.MAX_LENGTH)
          .optional(),
        ar: z.string({
            required_error: VALIDATION_MESSAGES.EVENT.VENUE.AR.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.EVENT.VENUE.AR.INVALID_TYPE,
        }).min(3, VALIDATION_MESSAGES.EVENT.VENUE.AR.MIN_LENGTH)
          .max(30, VALIDATION_MESSAGES.EVENT.VENUE.AR.MAX_LENGTH)
          .optional(),
    }, {
        invalid_type_error: VALIDATION_MESSAGES.EVENT.VENUE.INVALID_TYPE,
    }).refine(
        (data) => Object.keys(data).length > 0,
        { message: VALIDATION_MESSAGES.EVENT.VENUE.EMPTY }
    ).optional(),
    imageUrl: z.string({
        required_error: VALIDATION_MESSAGES.EVENT.IMAGE_URL.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.IMAGE_URL.INVALID_TYPE,
    }).regex(IMAGE_URL_PATTERN, VALIDATION_MESSAGES.EVENT.IMAGE_URL.INVALID)
      .optional(),
    price: z.number({
        required_error: VALIDATION_MESSAGES.EVENT.PRICE.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.PRICE.INVALID_TYPE,
    }).optional(),
    date: z.date({
        required_error: VALIDATION_MESSAGES.EVENT.DATE.REQUIRED,
        invalid_type_error: VALIDATION_MESSAGES.EVENT.DATE.INVALID_TYPE,
    }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.EVENT.UPDATE.EMPTY
});

export type UpdateEventDto = z.infer<typeof UpdateEventZod>;

