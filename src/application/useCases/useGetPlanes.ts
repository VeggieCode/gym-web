import { useState, useEffect } from 'react';
import type { Plan } from '../../domain/entities/Plan';
// Ya no importamos PlanRepository aquí
import { useDependencies } from '../../infrastructure/di/DependencyContext';

// Le quitamos el parámetro a la función
export const useGetPlanes = () => {
    const [planes, setPlanes] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    // Inyectamos la dependencia desde el contexto
    const { planRepository } = useDependencies();

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const data = await planRepository.obtenerActivos();
                setPlanes(data);
            } catch (error) {
                console.error("Error cargando planes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanes();
    }, [planRepository]); // Agregamos planRepository a las dependencias del useEffect

    return { planes, loading };
};