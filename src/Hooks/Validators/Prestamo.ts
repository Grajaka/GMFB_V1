import { z } from "zod";

export const PrestamoSchema = z.object({
    pr_UsuarioId: z.number().int().positive(),
    pr_DieSetId: z.number().int().positive(),
    pr_FechaPrestamo: z.coerce.date(),
    pr_FechaDevolucion: z.coerce.date().nullable().optional(),
    pr_Estado: z.string().max(30),
    pr_Observaciones: z.string().max(500).optional(),
    pr_FirmaRecibido:z.string().max(30),
    pr_FirmaEntrega:z.string().max(30),
});

export const PrestamoDBSchema = PrestamoSchema.extend({
    pr_IdPrestamo: z.number().int().positive()
});

export type Prestamo = z.infer<typeof PrestamoSchema>;
export type PrestamoDB = z.infer<typeof PrestamoDBSchema>;