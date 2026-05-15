import { z } from "zod";
export const ActividadSchema = z.object({
    ac_Nombre: z.string().max(150),
    ac_Descripcion: z.string().max(500),
    ac_FechaCreacion: z.coerce.date().optional(),
    ac_UsuarioId: z.number().int().positive()
});

export const ActividadDBSchema = ActividadSchema.extend({
    ac_IdActividad: z.number().int().positive()
});

export type Actividad = z.infer<typeof ActividadSchema>;
export type ActividadDB = z.infer<typeof ActividadDBSchema>;