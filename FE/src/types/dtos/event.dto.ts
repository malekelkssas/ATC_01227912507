import { z } from 'zod';
import { GetFullTagsResponseZod, GetTagResponseZod } from './tag.dto';
import { LanguageZod } from './language.dto';

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