import { z } from 'zod';
export const IdParamZod = z.string();

export type IdParamDto = z.infer<typeof IdParamZod>;
