import { z } from "zod";

export const DieSetSchema = z.object({
    ds_Codigo: z.string().min(1, "El código es obligatorio").max(100),
    ds_Descripcion: z.string().min(1, "La descripción es obligatoria").max(500),
    ds_Estado: z.enum(["ACTIVO", "INACTIVO", "MANTENIMIENTO"]),
    ds_FechaCreacion: z.coerce.date().optional(),
    ds_Dimensiones: z.string().max(100).optional(),
});

export type DieSetFormValues = z.infer<typeof DieSetSchema>;