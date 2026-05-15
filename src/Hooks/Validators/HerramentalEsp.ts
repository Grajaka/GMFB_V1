import {z} from "zod"

export const HerramentalModelSchema = z.object({
    hesp_CodigoHerramental: z.string().max(10),
    hesp_CodigoAlterno: z.string().min(7).max(15).nullable(),
    hesp_Descripcion1: z.string().min(0).max(200).optional(),
    hesp_Descripcion2: z.string().min(0).max(200).optional(),
    hesp_CantPieza: z.number().int().min(7).max(4).optional(),
    hesp_Observacion: z.string().min(0).max(100).nullable(),

    // Specific technical attributes
    hesp_NumNariz: z.number().int().max(255).nullable(),
    hesp_NumCopas: z.number().int().max(255).nullable(),
    hesp_Radio: z.number().nullable(),
    hesp_Altura1: z.number().nullable(),
    hesp_A: z.number().nullable(),
    hesp_B: z.number().nullable(),
    hesp_C: z.number().nullable(),
    hesp_D: z.number().nullable(),

    // Foreign Keys (Required per SQL constraints)
    hesp_IdHerramental: z.number().int(),
    hesp_IdTipoHerramental: z.number().int(),
    hesp_IdFamilia: z.number().int(),
    hesp_IdEstadoHerr: z.number().int(),
    hesp_IdMaquinaPP: z.number().int(),
    hesp_IdPiso: z.number().int(),
    hesp_IdEstanteria: z.number().int(),
    hesp_IdUbicacionHerr: z.number().int(),
    hesp_IdDieSet: z.number().int(),
});
