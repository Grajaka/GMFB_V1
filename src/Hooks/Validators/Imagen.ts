import {z} from 'zod'

export const ImagenSchema = z.object({
    im_NombreArchivo: z.string().max(255),
    im_RutaRelativa: z.string().max(500),
    im_TipoMime: z.string().max(100),
    im_FechaCreacion: z.coerce.date().optional(),
    im_DescripcionImagen: z.string().max(500).nullable(),
});

export const ImagenDBSchema = ImagenSchema.extend({
    im_IdImagen: z.number().int().positive()
});

export type Imagen = z.infer<typeof ImagenSchema>;
export type ImagenDB = z.infer<typeof ImagenDBSchema>;