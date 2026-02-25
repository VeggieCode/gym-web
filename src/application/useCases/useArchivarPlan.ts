import { useState } from 'react';
import { useDependencies } from '../../infrastructure/di/DependencyContext';

export const useArchivarPlan = () => {
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [errorDomain, setErrorDomain] = useState<{ tipo: string; mensaje: string } | null>(null);

    const { planRepository } = useDependencies();

    const ejecutar = async (id: number): Promise<boolean> => {
        setLoadingId(id);
        setErrorDomain(null);

        try {
            await planRepository.archivar(id);
            return true; // Éxito
        } catch (err: any) {
            if (err.error_type) {
                setErrorDomain({ tipo: err.error_type, mensaje: err.message });
            } else {
                setErrorDomain({ tipo: 'ErrorGenerico', mensaje: 'No se pudo archivar el plan.' });
            }
            return false; // Falló
        } finally {
            setLoadingId(null);
        }
    };

    return { ejecutar, loadingId, errorDomain };
};