import React, { createContext, useContext } from 'react';
import type { PlanRepository } from '../../domain/repositories/PlanRepository';
// Importamos la implementación real (la única vez que lo haremos)
import { planApi } from '../api/PlanApi';

// 1. Definimos qué servicios estarán disponibles en nuestra app
interface Dependencies {
    planRepository: PlanRepository;
}

// 2. Creamos el Contexto
const DependencyContext = createContext<Dependencies | null>(null);

// 3. Creamos el Provider (el componente que envuelve la app)
export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dependencies: Dependencies = {
        planRepository: planApi,
    };

    return (
        <DependencyContext.Provider value={dependencies}>
            {children}
            </DependencyContext.Provider>
    );
};

// 4. Creamos un Hook personalizado para consumir las dependencias fácilmente
export const useDependencies = () => {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error('useDependencies debe usarse dentro de un DependencyProvider');
    }
    return context;
};