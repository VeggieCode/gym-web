import { useState } from 'react';
import { useCrearPlan } from '../../application/useCases/useCrearPlan';


interface Props {
    onPlanCreado: () => void;
}

export const PlanForm = ({ onPlanCreado }: Props) => {
    const [nombre, setNombre] = useState('');
    const [nivel, setNivel] = useState('Principiante');
    const [precio, setPrecio] = useState('');

    const { ejecutar, loading, errorDomain } = useCrearPlan();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Ejecutamos la regla de negocio
        const exito = await ejecutar(nombre, nivel, Number(precio));

        if (exito) {
            setNombre(''); setPrecio(''); // Limpiamos inputs
            onPlanCreado(); // Avisamos a la lista que se actualice
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px', borderRadius: '8px' }}>
            <h3>Crear Nuevo Plan</h3>

            {/* PINTAMOS EL ERROR DE DOMINIO DE LARAVEL */}
            {errorDomain && (
                <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', marginBottom: '15px', borderRadius: '4px' }}>
                    <strong>{errorDomain.tipo}:</strong> {errorDomain.mensaje}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    placeholder="Nombre del plan"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    {/* Opción trampa para forzar la NivelInvalidoException */}
                    <option value="Experto">Experto (Probar Error)</option>
                </select>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading} style={{ cursor: loading ? 'wait' : 'pointer' }}>
                    {loading ? 'Guardando...' : 'Crear'}
                </button>
            </form>
        </div>
    );
};