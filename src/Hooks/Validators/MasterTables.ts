import { z } from 'zod';
import {DieSetSchema} from "./DieSet.js";

export const HerramentalSchema = z.object({
    he_IdHerramental: z.number().int().optional(),
    he_NombreHerramental: z.string().max(15),
    he_CodigoHerramental: z.string().max(4),
});
export type HerramentalSchema = z.infer<typeof HerramentalSchema>;

export const TipoHerramentalSchema = z.object({
    th_IdTipoHerramental: z.number().int().optional(),
    th_NombreTipoHerramental: z.string().max(15),
    th_CodigoTipoHerramental: z.string().max(4),
});
export type TipoHerramentalSchema = z.infer<typeof TipoHerramentalSchema>;

export const FamiliaSchema = z.object({
    fa_IdFamilia: z.number().int().optional(),
    fa_CodigoFamilia: z.string().max(4).optional(),
    fa_NombreFamilia: z.string().max(15),
});
export type FamiliaSchema = z.infer<typeof FamiliaSchema>;

export const ImagenSchema = z.object({
    im_IdImagen: z.number().int().optional(),
    im_FechaCreacion: z.date().default(() => new Date()),
    im_RutaRelativa: z.string().max(255),
    im_NombreImagen: z.string().max(60),
    im_DescripcionImagen: z.string().max(500).nullable(),
});

export type ImagenSchema = z.infer<typeof ImagenSchema>;