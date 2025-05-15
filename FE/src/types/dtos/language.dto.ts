import { z } from "zod";

export const LanguageZod = z.object({
    en: z.string(),
    ar: z.string(),
});

export type LanguageDto = z.infer<typeof LanguageZod>;
