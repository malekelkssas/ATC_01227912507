import { z } from 'zod';
import mongoose from 'mongoose';
import { VALIDATION_MESSAGES } from '@/utils/constants';
export const IdParamZod = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: VALIDATION_MESSAGES.INVALID_ID
});

export type IdParamDto = z.infer<typeof IdParamZod>;
