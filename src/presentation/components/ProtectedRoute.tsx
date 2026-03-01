import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';

interface Props {
    requiredRole?: string;
}

/**
 * Guardian de seguridad: Este componente envuelve tus pantallas. Si no tienes permiso, te saca.
 * @param requiredRole
 * @constructor
 */
export const ProtectedRoute: React.FC<Props> = ({ requiredRole }) => {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Si todavía estamos buscando en el localStorage, no hacemos nada (o mostramos un spinner)
    if (isLoading) {
        return <div style={{ padding: '20px' }}>Verificando sesión...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Sin token redirecciona al login
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/no-autorizado" replace />; // Sin rol, bloqueado
    }

    return <Outlet />; // Todo bien, renderiza la pantalla hija
};