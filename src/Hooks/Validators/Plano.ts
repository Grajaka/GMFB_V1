import { z } from "zod";

export const PlanoSchema = z.object({
    pl_NombrePlano: z.string().max(200),
    pl_RutaRelativa: z.string().max(500),
    pl_FechaCreacion: z.coerce.date().optional(),
    pl_DescripcionPlano: z.string().max(255).optional(),
});

export const PlanoDBSchema = PlanoSchema.extend({
    pl_IdPlano: z.number().int().positive()
});

export type Plano = z.infer<typeof PlanoSchema>;
export type PlanoDB = z.infer<typeof PlanoDBSchema>;