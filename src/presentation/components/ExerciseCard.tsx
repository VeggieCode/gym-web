import {Check, CheckCircle2, Dumbbell, Plus, Trophy} from "lucide-react";
import {useState} from "react";


// Microinteracción del Checkbox
function SetRow({ set, index, onToggle }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (!set.completed) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        }
        onToggle();
    };

    return (
        <div
            className={`grid grid-cols-4 items-center px-4 py-3 rounded-xl transition-all duration-300 mx-1
        ${set.completed ? 'bg-[var(--bg-base)] opacity-70' : 'bg-[var(--bg-surface-hover)] shadow-sm'}
        ${isAnimating ? 'bg-[var(--feedback-success)]/20 border border-[var(--feedback-success)] scale-[0.98]' : 'border border-transparent'}
      `}
        >
            <div className="text-left">
        <span className={`font-bold font-['Barlow'] text-xl ${set.completed ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
          {index}
        </span>
            </div>
            <div className="text-center">
                <div className={`font-semibold text-lg ${set.completed ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                    {set.kg}
                </div>
            </div>
            <div className="text-center">
                <div className={`font-semibold text-lg ${set.completed ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                    {set.reps}
                </div>
            </div>
            <div className="text-right flex justify-end">
                <button
                    onClick={handleToggle}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-90
            ${set.completed
                        ? 'bg-[var(--feedback-success)] text-[var(--text-inverse)] scale-100 shadow-[0_0_15px_rgba(0,230,118,0.4)]'
                        : 'bg-[var(--bg-base)] border-2 border-[var(--border-subtle)] text-transparent hover:border-[var(--action-primary)]'
                    }
          `}
                >
                    <Check size={20} strokeWidth={set.completed ? 3 : 2} className={set.completed ? "opacity-100" : "opacity-0"} />
                </button>
            </div>
        </div>
    );
}
export function ExerciseCard({ exercise, isCompleted, isActive, onToggleSet }) {
    // Estado 1: Ejercicio Completado (Colapsado)
    if (isCompleted) {
        return (
            <div className="bg-[var(--bg-surface)]/40 border border-[var(--feedback-success)]/30 rounded-2xl p-4 flex justify-between items-center transition-all duration-500">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--feedback-success)]/10 flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-[var(--feedback-success)]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-secondary)] line-through decoration-[var(--border-subtle)]">{exercise.name}</h3>
                        <p className="text-xs font-medium text-[var(--feedback-success)]">{exercise.sets.length} series completadas</p>
                    </div>
                </div>
            </div>
        );
    }

    // Estado 2: Ejercicio Próximo (Colapsado en espera)
    if (!isActive) {
        return (
            <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-2xl p-4 flex justify-between items-center opacity-60 grayscale-[50%] transition-all duration-500">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] flex items-center justify-center border border-[var(--border-subtle)]">
                        <Dumbbell size={18} className="text-[var(--text-secondary)]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-secondary)]">{exercise.name}</h3>
                        <p className="text-xs font-medium text-[var(--text-secondary)]">{exercise.sets.length} series pendientes</p>
                    </div>
                </div>
            </div>
        );
    }

    // Estado 3: Ejercicio Activo (Expandido)
    return (
        <div className="bg-[var(--bg-surface)] rounded-2xl p-2 shadow-2xl space-y-2 border border-[var(--action-primary)]/50 ring-1 ring-[var(--action-primary)]/20 transition-all duration-500 animate-in slide-in-from-bottom-2">
            <div className="p-2 pb-0 flex justify-between items-start">
                <div>
                    <h2 className="font-bold text-xl text-[var(--text-primary)]">{exercise.name}</h2>
                    <p className="text-sm text-[var(--text-secondary)]">{exercise.target}</p>
                </div>
            </div>

            {/* Récord Personal */}
            <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3 flex justify-between items-center mx-2 mt-2">
                <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-[var(--action-primary)]" />
                    <span className="text-xs font-medium text-[var(--text-secondary)]">PR Actual</span>
                </div>
                <span className="font-bold text-sm text-[var(--text-primary)]">{exercise.pr}</span>
            </div>

            {/* Cabeceras de columna */}
            <div className="grid grid-cols-4 px-4 py-2 mt-2 text-[var(--text-secondary)] text-xs font-bold uppercase tracking-wider text-center">
                <div className="text-left">Serie</div>
                <div>KG</div>
                <div>Reps</div>
                <div className="text-right"><Check size={16} className="inline ml-auto" /></div>
            </div>

            {/* Filas de Series */}
            {exercise.sets.map((set, index) => (
                <SetRow
                    key={set.id}
                    set={set}
                    index={index + 1}
                    onToggle={() => onToggleSet(set.id)}
                />
            ))}

            <button className="w-full py-3 text-[var(--text-secondary)] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                <Plus size={16} /> Añadir Serie
            </button>
        </div>
    );
}