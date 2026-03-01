import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../domain/entities/User';
import {useDependencies} from "../../infrastructure/di/DependencyContext.tsx";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // El contexto de estado consume el contexto de dependencias
    const { authRepository } = useDependencies();

    // Al cargar la app, revisamos si el usuario ya tenía sesión guardada
    useEffect(() => {
        // Revisamos el almacenamiento local
        const storedUser = authRepository.getUser();
        if (storedUser) {
            setUser(storedUser);
        }
        // Una vez que terminamos de revisar, quitamos la bandera de carga
        setIsLoading(false);
    }, [authRepository]);

    const login = async (email: string, pass: string) => {
        const { user } = await authRepository.login(email, pass);
        setUser(user);
    };

    const logout = () => {
        authRepository.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook para consumir la sesión desde la UI
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
};