import { z } from 'zod';

// Create Tag
export const CreateTagZod = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(3, "Name must be at least 3 characters long").max(10, "Name must be less than 10 characters"),
    color: z.string({
        required_error: "Color is required",
    }).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format").default("#FFFF00"),
});

export type CreateTagDto = z.infer<typeof CreateTagZod>;

export const CreateTagResponseZod = z.object({
    _id: z.string(),
    name: z.string(),
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
