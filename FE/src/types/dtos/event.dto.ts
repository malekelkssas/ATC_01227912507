import { z } from 'zod';
import { GetTagResponseZod } from './tag.dto';

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