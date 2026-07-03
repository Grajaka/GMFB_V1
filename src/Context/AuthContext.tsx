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
        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser) as User;
                setToken(storedToken);
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
            const { token: receivedToken, user: receivedUser } = response;

            // Construct frontend User object, mapping its role to the numeric type 1, 2, or 3
            const mappedUser: User = {
                id: receivedUser.id,
                username: receivedUser.username,
                role: receivedUser.role,
                user_type: mapRoleToType(receivedUser.role)
            };
            // Persist session
            localStorage.setItem('token', receivedToken);
            localStorage.setItem('user', JSON.stringify(mappedUser));
            setToken(receivedToken);
            setUser(mappedUser);
        } catch (err: any) {
            console.error("Login failed", err);
            const errorMessage = err?.message || err?.error || "Error de inicio de sesión";
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
    const isAuthenticated = !!token;
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