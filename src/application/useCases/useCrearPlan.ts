import { useState } from 'react';
import { useDependencies } from '../../infrastructure/di/DependencyContext';

// Sin parámetros
export const useCrearPlan = () => {
    const [loading, setLoading] = useState(false);
    const [errorDomain, setErrorDomain] = useState<{ tipo: string; mensaje: string } | null>(null);

    // Inyectamos desde el contexto
    const { planRepository } = useDependencies();

    const ejecutar = async (nombre: string, nivel: string, precio: number): Promise<boolean> => {
        setLoading(true);
        setErrorDomain(null);
        try {
            await planRepository.crear(nombre, nivel, precio);
            return true;
        } catch (err: any) {
            if (err.error_type) {
                setErrorDomain({ tipo: err.error_type, mensaje: err.message });
            } else {
                setErrorDomain({ tipo: 'ErrorGenerico', mensaje: 'Ocurrió un problema inesperado.' });
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { ejecutar, loading, errorDomain };
};