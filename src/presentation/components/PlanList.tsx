import { useGetPlanes } from '../../application/useCases/useGetPlanes';
import { useArchivarPlan } from '../../application/useCases/useArchivarPlan';

interface Props {
    onPlanArchivado: () => void;
}

export const PlanList = ({ onPlanArchivado }: Props) => {
    const { planes, loading: cargandoPlanes } = useGetPlanes();

    const { ejecutar: archivarPlan, loadingId, errorDomain } = useArchivarPlan();

    if (cargandoPlanes) return <p style={{ color: 'gray' }}>Cargando planes desde Laravel...</p>;

    if (planes.length === 0) return <p>No hay planes activos en el sistema.</p>;

    const handleArchivar = async (id: number) => {
        const exito = await archivarPlan(id);
        if (exito) {
            onPlanArchivado();
        }
    };

    return (
        <div>
            {/* Manejo de errores al archivar (Ej. PlanYaInactivoException) */}
            {errorDomain && (
                <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', marginBottom: '15px', borderRadius: '4px' }}>
                    <strong>{errorDomain.tipo}:</strong> {errorDomain.mensaje}
                </div>
            )}

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {planes.map((plan) => (
                    <div key={plan.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '200px' }}>
                        <h3 style={{ marginTop: 0 }}>{plan.nombre}</h3>
                        <p><strong>Nivel:</strong> {plan.nivel}</p>
                        <p><strong>Precio:</strong> ${plan.precio}</p>

                        <button
                            onClick={() => handleArchivar(plan.id)}
                            disabled={loadingId === plan.id}
                            style={{
                                marginTop: '10px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: loadingId === plan.id ? 'wait' : 'pointer'
                            }}
                        >
                            {loadingId === plan.id ? 'Archivando...' : 'Archivar Plan'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};