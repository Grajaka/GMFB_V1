import {z} from 'zod';

export const MaquinaSchema = z.object({
    ma_IdMaquina: z.number().int().optional(),
    ma_NumMaquina: z.number().int(),
    ma_NombreMaquina: z.string().max(30),
    ma_AnioInstalacion: z.string().optional(), // Or z.date()
    ma_Marca: z.string().max(30).optional(),
    ma_CapMaquina: z.number().optional(),
    ma_CodigoMaquina: z.string().max(20),
    ma_DescMaquina: z.string().max(500).nullable(),
    ma_IdEstadoMaquina: z.number().int(),
    ma_IdTipoMaquina: z.number().int(),
});