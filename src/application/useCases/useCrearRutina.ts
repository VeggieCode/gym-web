import { useState } from 'react';
import { useDependencies } from '../../infrastructure/di/DependencyContext';
import { Routine } from '../../domain/entities/Routine';

export const useCrearRutina = () => {
    const { routineRepository } = useDependencies();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const ejecutar = async (rutina: Routine): Promise<Routine | null> => {
        setIsLoading(true);
        setApiError(null);
        try {
            // El caso de uso delega la persistencia al puerto (la interfaz del repositorio)
            const nuevaRutina = await routineRepository.saveRoutine(rutina);
            return nuevaRutina;
        } catch (error: any) {
            setApiError(error.message || 'Ocurrió un error al guardar la rutina.');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { ejecutar, isLoading, apiError };
};