import {z} from 'zod'


export const UbicacionHerramentalSchema = z.object({
    // Machine Relations (from TABLE HERRAMENTALESPECIFICO)
    hesp_IdMaquinaPP: z.coerce.number().int().min(1, "Seleccione una máquina principal"),
    hesp_IdMaquinaOpc: z.coerce.number().int().optional().nullable(),

    // Ubication Details

   // es_NombreEstanteria : z.string().max(100),
    //nombre_Estanteria: z.coerce.number().int().min(1, "Seleccione una estantería"),
    hesp_IdPiso: z.coerce.number().int().min(1, "Seleccione un piso"),
    //nombre_Piso: z.coerce.number().int().min(1, "Seleccione un piso"),
    uh_NumeroFila: z.coerce.number().int().min(1, "Requerido"),
    uh_NumeroColumna: z.coerce.number().int().min(1, "Requerido"),
    uh_NumeroPosicion: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdEstanteria:z.coerce.number().int().min(1, "Seleccione un estantería"),
    es_IdEstanteria:z.coerce.number().int(),
//Die-set
    hesp_IdDieSet:  z.coerce.number().int().min(1, "Seleccione una máquina principal"),
    di_CodigoDieSet: z.string().max(10),
    di_IdDieSet:  z.coerce.number().int().optional().nullable(),


    // State and Stock
    hesp_IdEstadoHerr: z.coerce.number().int().min(1, "Seleccione un estado"),
    hesp_CantHerramental: z.coerce.number().int().min(1, "La existencia debe ser al menos 1"),


    // Optional/Pending
    hesp_IdActividad: z.coerce.number().int().optional().nullable(),
    hesp_Observacion: z.string().max(500).optional().nullable(),
});
export type UbicacionFormData = z.infer<typeof UbicacionHerramentalSchema>;
export const PageUbicSchema = UbicacionHerramentalSchema.pick({

    hesp_IdMaquinaPP: true,
    hesp_IdMaquinaOpc:true,
    uh_NumeroFila: true,
    uh_NumeroColumna: true,
    uh_NumeroPosicion: true,
    hesp_CantHerramental: true,
    hesp_Observacion: true,
    hesp_IdActividad: true,
    hesp_IdEstadoHerr: true,
    hesp_IdDieSet: true,
    es_IdEstanteria: true,
    hesp_IdPiso: true,
    hesp_IdEstanteria: true,
    di_CodigoDieSet: true,
    //di_IdDieSet: true,

});