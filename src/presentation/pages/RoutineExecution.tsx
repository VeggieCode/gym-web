import {useState} from "react";
import {ExerciseCard} from "../components/ExerciseCard.tsx";
import {Activity, CheckCircle2, Timer} from "lucide-react";

export function RoutineExecution() {
    // Estado complejo de una rutina completa
    const [routine, setRoutine] = useState([
        {
            id: 'ex1',
            name: 'Press de Banca',
            target: 'Pecho',
            pr: '110 kg x 5',
            sets: [
                {id: 's1', kg: 100, reps: 10, completed: true},
                {id: 's2', kg: 100, reps: 8, completed: false},
                {id: 's3', kg: 100, reps: 8, completed: false},
            ]
        },
        {
            id: 'ex2',
            name: 'Aperturas con Mancuernas',
            target: 'Pecho',
            pr: '24 kg x 12',
            sets: [
                {id: 's4', kg: 20, reps: 12, completed: false},
                {id: 's5', kg: 20, reps: 10, completed: false},
            ]
        },
        {
            id: 'ex3',
            name: 'Extensión de Tríceps',
            target: 'Tríceps',
            pr: '35 kg x 15',
            sets: [
                {id: 's6', kg: 30, reps: 12, completed: false},
                {id: 's7', kg: 30, reps: 12, completed: false},
            ]
        }
    ]);

    const toggleSet = (exerciseId, setId) => {
        setRoutine(prevRoutine =>
            prevRoutine.map(ex => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: ex.sets.map(s => s.id === setId ? {...s, completed: !s.completed} : s)
                    };
                }
                return ex;
            })
        );
    };

    // Cálculos de progreso global
    const totalSets = routine.reduce((acc, ex) => acc + ex.sets.length, 0);
    const completedSets = routine.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
    const progress = (completedSets / totalSets) * 100;
    const isRoutineFinished = completedSets === totalSets;

    // Determinar qué ejercicio está activo (el primero que tenga series sin completar)
    const activeExerciseId = routine.find(ex => ex.sets.some(s => !s.completed))?.id;

    return (
        <div className="animate-in fade-in duration-500 space-y-6 pb-24">
            {/* App Header Global */}
            <header className="flex justify-between items-end pb-4 border-b border-[var(--border-subtle)]">
                <div>
                    <p className="text-[var(--action-primary)] font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Activity size={16}/> Día de Pecho y Tríceps
                    </p>
                    <h1 className="font-bold text-3xl font-['Barlow'] text-[var(--text-primary)]">
                        {isRoutineFinished ? '¡Entrenamiento Listo!' : 'En progreso...'}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-[var(--text-secondary)] text-xs uppercase font-bold mb-1">Tiempo</p>
                    <p className={`font-['Barlow'] font-bold text-2xl ${isRoutineFinished ? 'text-[var(--feedback-success)]' : 'text-[var(--text-primary)]'}`}>
                        45:22
                    </p>
                </div>
            </header>

            {/* Barra de Progreso Sticky Global */}
            <div className="sticky top-[72px] z-40 bg-[var(--bg-base)] py-2">
                <div
                    className="flex justify-between text-xs font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                    <span>Progreso Total</span>
                    <span>{completedSets} / {totalSets} Series</span>
                </div>
                <div className="w-full h-2 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-700 ease-out ${isRoutineFinished ? 'bg-[var(--feedback-success)]' : 'bg-gradient-to-r from-[var(--action-primary)]/50 to-[var(--action-primary)]'}`}
                        style={{width: `${progress}%`}}
                    ></div>
                </div>
            </div>

            {/* Lista de Ejercicios */}
            <div className="space-y-4">
                {routine.map((exercise) => {
                    const isCompleted = exercise.sets.every(s => s.completed);
                    const isActive = exercise.id === activeExerciseId;

                    return (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            isCompleted={isCompleted}
                            isActive={isActive}
                            onToggleSet={(setId) => toggleSet(exercise.id, setId)}
                        />
                    );
                })}
            </div>

            {/* Bottom CTA & FAB Space (Adaptativo) */}
            <div
                className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto flex items-center justify-between gap-4 z-50">
                {isRoutineFinished ? (
                    <button
                        className="flex-1 h-14 bg-[var(--feedback-success)] text-[var(--text-inverse)] font-bold text-sm rounded-full shadow-[0_0_20px_rgba(0,230,118,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2">
                        <CheckCircle2 size={20}/> FINALIZAR ENTRENAMIENTO
                    </button>
                ) : (
                    <>
                        <button
                            className="flex-1 h-14 bg-[var(--bg-base)]/80 backdrop-blur-md border-2 border-[var(--feedback-danger)] text-[var(--text-primary)] font-bold text-sm rounded-full active:scale-[0.98] transition-colors shadow-[0_0_15px_rgba(255,23,68,0.15)] hover:bg-[var(--feedback-danger)]">
                            TERMINAR RUTINA
                        </button>
                        <button
                            className="w-16 h-16 bg-[var(--action-primary)] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.2)] active:scale-95 transition-transform hover:scale-105">
                            <Timer size={28} className="text-[var(--text-inverse)]"/>
                        </button>
                    </>
                )}
            </div>
        </div>
    );


}
