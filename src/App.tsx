import { useState } from 'react';
import { PlanList } from './presentation/components/PlanList';
import { PlanForm } from './presentation/components/PlanForm';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const recargarLista = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Dashboard del Gimnasio 💪</h1>

            <PlanForm onPlanCreado={recargarLista} />

            <h2>Planes Activos</h2>
            {/* Le pasamos el callback al PlanList */}
            <PlanList key={refreshKey} onPlanArchivado={recargarLista} />
        </div>
    );
}

export default App;