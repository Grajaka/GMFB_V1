import { z } from "zod";

export const ManualSchema = z.object({
    ma_NombreManual: z.string().max(200),
    ma_RutaRelativa: z.string().max(500),
    ma_Version: z.string().max(50),
    ma_FechaCreacion: z.coerce.date().optional(),
    ma_Montaje: z.string().max(500).optional(),
    ma_Calibracion: z.string().max(500).optional(),
    ma_Desmontaje: z.string().max(500).optional(),
    ma_Uso: z.string().max(500).optional(),
});

export const ManualDBSchema = ManualSchema.extend({
    ma_IdManual: z.number().int().positive()
});

export type Manual = z.infer<typeof ManualSchema>;
export type ManualDB = z.infer<typeof ManualDBSchema>;