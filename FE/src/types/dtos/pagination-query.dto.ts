import { z } from 'zod';
import { TranslationConstants } from '@/utils/constants';

export const PaginationQueryZod = z.object({
    page: z.number({
        required_error: TranslationConstants.VALIDATION.REQUIRED.PAGE,
    }).min(0).default(0),
    limit: z.number({
            required_error: TranslationConstants.VALIDATION.REQUIRED.LIMIT,
        }).min(1)
          .max(100)
          .default(10)
});

export type PaginationQueryDto = z.infer<typeof PaginationQueryZod>;

export const PaginationResponseZod = z.object({
    data: z.array(z.any()),
    pagination: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        hasMore: z.boolean(),
        totalPages: z.number()
    })
});

export type PaginationResponseDto<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
        totalPages: number;
    };
};
