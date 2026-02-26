import { useState } from 'react';
import { PlanList } from './presentation/components/PlanList';
import { PlanForm } from './presentation/components/PlanForm';
import {RoutineForm} from "./presentation/components/RoutineForm.tsx";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const recargarLista = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Dashboard del Gimnasio 💪</h1>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <RoutineForm />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <PlanForm onPlanCreado={recargarLista}/>
                </div>
            </div>
            <h2>Planes Activos</h2>
            {/* Le pasamos el callback al PlanList */}
            <PlanList key={refreshKey} onPlanArchivado={recargarLista} />
        </div>
    );
}

export default App;