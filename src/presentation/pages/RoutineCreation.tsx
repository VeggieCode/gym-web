import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopAppBar } from '../components/TopAppBar';
import { InputGroup } from '../components/InputGroup';
import { Button } from '../components/Button';
import { SetRow } from '../components/ui/SetRow';

export default function RoutineCreation() {
    const navigate = useNavigate();

    // Estado del formulario
    const [routineName, setRoutineName] = useState('');
    const [notes, setNotes] = useState('');

    // Simulamos un ejercicio en la rutina para mostrar la UI
    const [sets, setSets] = useState([
        { id: 1, weight: '', reps: '', isCompleted: false },
        { id: 2, weight: '', reps: '', isCompleted: false },
    ]);

    const toggleSet = (index: number) => {
        const newSets = [...sets];
        newSets[index].isCompleted = !newSets[index].isCompleted;
        setSets(newSets);
    };

    const updateSet = (index: number, field: 'weight' | 'reps', value: string) => {
        const newSets = [...sets];
        newSets[index][field] = value;
        setSets(newSets);
    };

    const addSet = () => {
        setSets([...sets, { id: Date.now(), weight: '', reps: '', isCompleted: false }]);
    };

    const handleSave = () => {
        console.log('Guardando rutina...', { routineName, notes, sets });
        navigate('/'); // Regresamos al dashboard
    };

    return (
        <div className="min-h-screen bg-base pb-24">
            {/* Cabecera */}
            <TopAppBar
                title="Nueva Rutina"
                onBack={() => navigate('/')}
                onSave={handleSave}
            />

            {/* Contenedor con padding para el formulario */}
            <div className="px-md py-lg flex flex-col gap-lg">

                {/* Sección de Metadatos */}
                <div className="flex flex-col gap-md">
                    <InputGroup
                        label="Nombre de la rutina"
                        placeholder="Ej. Día de Pierna"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                    />

                    <InputGroup
                        label="Notas (Opcional)"
                        placeholder="¿Cómo te sientes hoy?"
                        isTextArea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {/* =========================================================
            BLOQUE DE EJERCICIO (Esto luego será su propio componente)
            ========================================================= */}
                <div className="flex flex-col gap-4">

                    {/* Cabecera del Ejercicio */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-heading font-bold text-text-primary">Press de Banca con Barra</h3>
                        <button className="text-text-secondary hover:text-text-primary w-8 h-8 flex items-center justify-center">⋮</button>
                    </div>

                    {/* Fila de Títulos */}
                    <div className="flex flex-row items-center w-full px-2 gap-4">
                        <div className="flex flex-1 items-center gap-4">
                            <span className="w-6 text-center text-xs text-text-secondary font-semibold uppercase">Serie</span>
                            <span className="flex-1 text-xs text-text-secondary font-semibold uppercase">Anterior</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="w-16 text-center text-xs text-text-secondary font-semibold uppercase">kg</span>
                            <span className="w-16 text-center text-xs text-text-secondary font-semibold uppercase">reps</span>
                            <span className="w-9 text-center text-xs text-text-secondary font-semibold uppercase">✓</span>
                        </div>
                    </div>

                    {/* Series */}
                    <div className="flex flex-col gap-1">
                        {sets.map((set, index) => (
                            <SetRow
                                key={set.id}
                                setNumber={index + 1}
                                previousHistory="50kg x 10"
                                weightValue={set.weight}
                                repsValue={set.reps}
                                isCompleted={set.isCompleted}
                                onWeightChange={(val) => updateSet(index, 'weight', val)}
                                onRepsChange={(val) => updateSet(index, 'reps', val)}
                                onToggleComplete={() => toggleSet(index)}
                            />
                        ))}
                    </div>

                    {/* Botón para agregar serie */}
                    <Button variant="ghost" size="sm" isFullWidth onClick={addSet}>
                        + Agregar serie
                    </Button>

                </div>

                {/* Botón Final para buscar más ejercicios */}
                <div className="mt-4">
                    <Button variant="outline" isFullWidth onClick={() => console.log('Abrir buscador de ejercicios')}>
                        + Agregar Ejercicio
                    </Button>
                </div>

            </div>
        </div>
    );
}