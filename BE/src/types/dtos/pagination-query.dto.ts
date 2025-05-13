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
});

export type PaginationQueryDto = z.infer<typeof PaginationQueryZod>;

