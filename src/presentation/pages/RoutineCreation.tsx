import { useState } from 'react';
import { SetRow } from '../components/ui/SetRow';
import { Button } from '../components/Button';

export default function RoutineCreation() {
    // Simulamos el estado de 3 series para un ejercicio
    const [sets, setSets] = useState([
        { id: 1, weight: '', reps: '', isCompleted: false },
        { id: 2, weight: '', reps: '', isCompleted: false },
        { id: 3, weight: '', reps: '', isCompleted: false },
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

    return (
        <div className="min-h-screen bg-base p-md flex flex-col items-center pt-10">

            <div className="w-full max-w-md bg-surface p-md rounded-md shadow-level1 flex flex-col gap-4">

                {/* Cabecera del Ejercicio */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-heading font-bold text-text-primary">Press de Banca con Barra</h2>
                    <button className="text-text-secondary hover:text-text-primary">⋮</button>
                </div>

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

                {/* Renderizado de las Series */}
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

                {/* Botón de Agregar Serie */}
                <div className="mt-2">
                    <Button variant="ghost" size="sm" isFullWidth className="text-sm">
                        + Agregar serie
                    </Button>
                </div>

            </div>

        </div>
    );
}