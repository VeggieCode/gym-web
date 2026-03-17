import React from 'react';
import { Check } from 'lucide-react'; // Asegúrate de tener lucide-react instalado (npm install lucide-react)

// Definimos la variante para soportar distintos tipos de ejercicios en el futuro
export type ExerciseType = 'Weight_Reps' | 'Bodyweight_Reps' | 'Duration';

interface SetRowProps {
    setNumber: number;
    previousHistory?: string;
    type?: ExerciseType;

    // Valores controlados
    weightValue?: string | number;
    repsValue?: string | number;
    isCompleted: boolean;

    // Eventos
    onWeightChange?: (val: string) => void;
    onRepsChange?: (val: string) => void;
    onToggleComplete: () => void;
}

export const SetRow: React.FC<SetRowProps> = ({
                                                  setNumber,
                                                  previousHistory = '-',
                                                  type = 'Weight_Reps',
                                                  weightValue = '',
                                                  repsValue = '',
                                                  isCompleted,
                                                  onWeightChange,
                                                  onRepsChange,
                                                  onToggleComplete,
                                              }) => {

    // Sub-componente interno para los inputs pequeñitos (kg / reps)
    // Lo definimos aquí para mantener el código principal limpio
    const CompactInput = ({
                              placeholder,
                              value,
                              onChange,
                              disabled
                          }: {
        placeholder: string;
        value: string | number;
        onChange?: (val: string) => void;
        disabled: boolean;
    }) => (
        <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            className={`w-16 h-9 text-center text-sm rounded-md transition-colors duration-200 outline-none
        ${disabled
                ? 'bg-transparent text-text-primary font-semibold' // Si está completado, parece texto normal
                : 'bg-base border border-border-subtle text-text-primary focus:border-primary-main focus:ring-1 focus:ring-primary-main placeholder:text-text-secondary/50'
            }`}
        />
    );

    return (
        // Contenedor Principal (Auto Layout Horizontal)
        <div className={`flex flex-row items-center w-full py-2 gap-4 transition-opacity duration-200 ${isCompleted ? 'opacity-80' : 'opacity-100'}`}>

            {/* LADO IZQUIERDO: Fill Container (flex-1) para empujar los inputs a la derecha */}
            <div className="flex flex-1 items-center gap-4">
                {/* Número de serie */}
                <div className="w-6 text-center">
          <span className="text-text-primary font-bold font-body text-sm">
            {setNumber}
          </span>
                </div>

                {/* Historial anterior (Truncado por si el texto es muy largo) */}
                <div className="flex-1 truncate">
          <span className="text-text-secondary text-sm font-body">
            {previousHistory}
          </span>
                </div>
            </div>

            {/* LADO DERECHO: Inputs y Botón Check */}
            <div className="flex flex-row items-center gap-2">

                {/* Lógica de Variantes: Mostramos Kg si es de Peso */}
                {type === 'Weight_Reps' && (
                    <CompactInput
                        placeholder="kg"
                        value={weightValue}
                        onChange={onWeightChange}
                        disabled={isCompleted}
                    />
                )}

                {/* Mostramos Reps si es de Peso o Peso Corporal */}
                {(type === 'Weight_Reps' || type === 'Bodyweight_Reps') && (
                    <CompactInput
                        placeholder="reps"
                        value={repsValue}
                        onChange={onRepsChange}
                        disabled={isCompleted}
                    />
                )}

                {/* Botón de Completar (CheckButton) */}
                <button
                    type="button"
                    onClick={onToggleComplete}
                    className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main active:scale-95
            ${isCompleted
                        ? 'bg-success-main text-text-primary shadow-level1'
                        : 'bg-surface border border-border-subtle text-text-secondary hover:bg-surface-hover'
                    }`}
                >
                    <Check size={18} strokeWidth={isCompleted ? 3 : 2} />
                </button>

            </div>
        </div>
    );
};