import { z } from "zod";

export const UserSchema = z.object({
    us_Nombre: z.string().min(3, "Nombre muy corto").max(100),
    us_Correo: z.email("Email inválido"),
    us_Rol: z.enum(["ADMIN", "OPERADOR", "CONSULTA"]),
    us_Activo: z.boolean().default(true),
    us_User: z.string().min(3, "Usuario muy corto").max(100),
    us_Password: z.string(),
});

export interface User {
    id: number;
    username: string;
    role: string;
    user_type: number; // 1 = Administrador/ADMIN, 2 = Operador/OPERADOR, 3 = Visualizador/CONSULTA
}

export const mapRoleToType = (role: any): number => {
    if (role === undefined || role === null) return 3;
    if (typeof role === 'number') return role;
    if (typeof role === 'object') {
        if ('id' in role && typeof role.id === 'number') return role.id;
        if ('id' in role && !isNaN(Number(role.id))) return Number(role.id);
        if ('nombre' in role) return mapRoleToType(role.nombre);
    }
    const r = String(role).toUpperCase().trim();
    if (r === 'ADMINISTRADOR' || r === 'ADMIN' || r === '1') return 1;
    if (r === 'OPERADOR' || r === '2') return 2;
    if (r === 'VISUALIZADOR' || r === 'CONSULTA' || r === '3') return 3;
    return 3;
};

export interface LoginResponse {
    access: string;
    refresh: string;
    usuario: {
        id: number;
        user: string;
        nombre: string;
        tipo_usuario: number;
        tipo_usuario_nombre: string;
    };
    mensaje?: string;
}

export interface ApiError {
    message: string;
    error: string;
    success: boolean;
}