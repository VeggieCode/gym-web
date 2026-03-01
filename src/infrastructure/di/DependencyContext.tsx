import React, { createContext, useContext } from 'react';
// Importamos la implementación real (la única vez que lo haremos)
import { PlanApi } from '../api/PlanApi';
import { RoutineApi } from '../api/RoutineApi.ts';
import {AuthApi} from "../api/AuthApi.ts";

import type { PlanRepository } from '../../domain/repositories/PlanRepository';
import type {RoutineRepository} from "../../domain/repositories/RoutineRepository.ts";
import type {AuthRepository} from "../../domain/repositories/AuthRepository.ts";


// 1. Definimos qué servicios estarán disponibles en nuestra app
interface Dependencies {
    planRepository: PlanRepository;
    routineRepository: RoutineRepository;
    authRepository: AuthRepository
}

const dependencies: Dependencies = {
    planRepository: new PlanApi(),
    routineRepository: new RoutineApi(),
    authRepository: new AuthApi()
};

// 2. Creamos el Contexto
const DependencyContext = createContext<Dependencies | null>(null);

// 3. Creamos el Provider (el componente que envuelve la app)
export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

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