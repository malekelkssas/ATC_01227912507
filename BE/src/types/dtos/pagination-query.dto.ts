import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/utils/constants';

// NOTE: Parsing because this is a query param
export const PaginationQueryZod = z.object({
    page: z.preprocess(
        (val) => parseInt((val as string) || "0"),
        z.number({
            required_error: VALIDATION_MESSAGES.PAGINATION.PAGE.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.PAGINATION.PAGE.INVALID_TYPE,
        }).min(0).default(0)
    ),
    limit: z.preprocess(
        (val) => parseInt((val as string) || "10"),
        z.number({
            required_error: VALIDATION_MESSAGES.PAGINATION.LIMIT.REQUIRED,
            invalid_type_error: VALIDATION_MESSAGES.PAGINATION.LIMIT.INVALID_TYPE,
        }).min(1, VALIDATION_MESSAGES.PAGINATION.LIMIT.MIN)
          .max(100, VALIDATION_MESSAGES.PAGINATION.LIMIT.MAX)
          .default(10)
    ),
    search: z.string().optional(),
    filter: z.preprocess(
        (val) => val ? JSON.parse(val as string) : undefined,
        z.record(z.string(), z.any()).optional()
    )
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
