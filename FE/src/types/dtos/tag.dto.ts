import { z } from 'zod';
import { LanguageZod } from './language.dto';


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

export const GetFullTagsResponseType = z.array(GetFullTagsResponseZod);

export type GetFullTagsResponseDto = z.infer<typeof GetFullTagsResponseType>;
