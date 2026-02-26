import React, { useState } from 'react';
import { useCrearRutina } from '../../application/useCases/useCrearRutina';
import { Routine } from '../../domain/entities/Routine';
import { Exercise } from '../../domain/entities/Exercise';

export const RoutineForm: React.FC = () => {
    const { ejecutar, isLoading, apiError } = useCrearRutina();

    // Estado del formulario
    const [name, setName] = useState('');
    const [assignedDays, setAssignedDays] = useState<string[]>([]);
    const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }]);
    const [validationError, setValidationError] = useState<string | null>(null);

    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const toggleDia = (dia: string) => {
        setAssignedDays(prev =>
            prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
        );
    };

    const addExerciseRow = () => {
        setExercises([...exercises, { name: '', sets: '', reps: '' }]);
    };

    const removeExerciseRow = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const updateExercise = (index: number, field: keyof typeof exercises[0], value: string) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        try {
            // 1. Construimos las entidades de dominio (Validación automática)
            const ejerciciosPuros = exercises.map(
                (ex) => new Exercise(ex.name, Number(ex.sets), Number(ex.reps))
            );
            const rutinaPura = new Routine(name, assignedDays, ejerciciosPuros);

            // 2. Ejecutamos el caso de uso
            const resultado = await ejecutar(rutinaPura);

            if (resultado) {
                alert('¡Rutina transaccional creada con éxito!');
                // Reiniciamos el formulario
                setName('');
                setAssignedDays([]);
                setExercises([{ name: '', sets: '', reps: '' }]);
            }
        } catch (error: any) {
            // Si el Dominio rechaza los datos (ej. series negativas o sin nombre), cae aquí
            setValidationError(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Crear Nueva Rutina</h2>

            {(validationError || apiError) && (
                <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
                    {validationError || apiError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre de la Rutina:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        placeholder="Ej. Hipertrofia Avanzada"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Días Asignados:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
                        {diasSemana.map(dia => (
                            <label key={dia}>
                                <input
                                    type="checkbox"
                                    checked={assignedDays.includes(dia)}
                                    onChange={() => toggleDia(dia)}
                                /> {dia}
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Ejercicios</h3>
                        <button type="button" onClick={addExerciseRow} style={{ padding: '5px 10px' }}>
                            + Añadir Ejercicio
                        </button>
                    </div>

                    {exercises.map((ex, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Nombre (ej. Press)"
                                value={ex.name}
                                onChange={(e) => updateExercise(index, 'name', e.target.value)}
                                style={{ flex: 2, padding: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="Series"
                                value={ex.sets}
                                onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                                style={{ flex: 1, padding: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="Reps"
                                value={ex.reps}
                                onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                                style={{ flex: 1, padding: '5px' }}
                            />
                            <button type="button" onClick={() => removeExerciseRow(index)} style={{ color: 'red', cursor: 'pointer' }}>
                                ✖
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {isLoading ? 'Guardando...' : 'Guardar Rutina Completa'}
                </button>
            </form>
        </div>
    );
};