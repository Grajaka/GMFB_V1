import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.js';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedTypes?: number[]; // e.g. [1, 2, 3]
}
export default function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
    const { isAuthenticated, user, loading } = useAuth();
    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#1e1e1e] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"></div>
                    <p className="text-lg font-semibold tracking-wide">Cargando sesión...</p>
                </div>
            </div>
        );
    }
    if (!isAuthenticated || !user) {
        return <Navigate to="/Login" replace />;
    }
    // Check if the current user type is allowed
    if (allowedTypes && !allowedTypes.includes(user.user_type)) {
        // If type 3 (Visualizador) is trying to access a disallowed route, redirect to their main view
        if (user.user_type === 3) {
            return <Navigate to="/VisualGnrlv2" replace />;
        }

        // General fallback redirect
        return <Navigate to="/VisualGnrlv2" replace />;
    }
    return <>{children}</>;
}
