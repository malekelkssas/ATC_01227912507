import { z } from 'zod';
import mongoose from 'mongoose';

export const IdParamZod = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ID format'
});

export type IdParamDto = z.infer<typeof IdParamZod>;
