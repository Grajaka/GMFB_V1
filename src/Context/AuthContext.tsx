import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../Hooks/Validators/User.js';
import { mapRoleToType } from '../Hooks/Validators/User.js';
import { AuthService } from '../Services/authService.js';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // Load initial session on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser) as User;
                parsedUser.user_type = mapRoleToType(parsedUser.user_type ?? parsedUser.role);
                setToken(storedToken || 'session_active');
                setUser(parsedUser);
            } catch (err) {
                console.error("Failed to parse stored user session", err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);
    const login = async (us_User: string, us_Password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await AuthService.login(us_User, us_Password);
            const receivedToken = response.access || (response as any).token || (response as any).key || (response as any).auth_token || 'session_active';
            const rawUser = response.usuario || (response as any).user || response;
            if (!rawUser || typeof rawUser !== 'object') {
                throw new Error("Respuesta de usuario inválida del servidor");
            }
            const rawUserType = rawUser.user_type ?? rawUser.tipo_usuario ?? rawUser.role ?? rawUser.tipo_usuario_nombre;
            const numericUserType = mapRoleToType(rawUserType);

            // Construct frontend User object, mapping its role to the numeric type 1, 2, or 3
            const mappedUser: User = {
                id: rawUser.id ?? 1,
                username: rawUser.username || rawUser.user || rawUser.nombre || us_User,
                role: typeof rawUser.role === 'string' ? rawUser.role : (rawUser.tipo_usuario_nombre || 'ADMIN'),
                user_type: numericUserType
            };
            // Persistir sesión con el token de acceso
            localStorage.setItem('token', receivedToken);
            localStorage.setItem('user', JSON.stringify(mappedUser));
            setToken(receivedToken);
            setUser(mappedUser);
        } catch (err: any) {
            console.error("Login failed", err);
            const errorMessage = err?.response?.data?.detail || err?.response?.data?.message || err?.message || err?.error || "Error de inicio de sesión";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {
        AuthService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setError(null);
    };
    const isAuthenticated = !!token || !!user;
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout, error }}>
            {children} {/*Represents any component that's  gonna use the provider */}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}