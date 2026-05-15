import { z } from "zod";

export const UsuarioSchema = z.object({
    us_Nombre: z.string().min(3, "Nombre muy corto").max(100),
    us_Correo: z.email("Email inválido"),
    us_Rol: z.enum(["ADMIN", "OPERADOR", "CONSULTA"]),
    us_Activo: z.boolean().default(true),
    us_User: z.string().min(3, "Usuario muy corto").max(100),
    us_Password: z.string(),
});

export type UsuarioFormValues = z.infer<typeof UsuarioSchema>;