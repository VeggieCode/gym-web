// src/presentation/components/SetRow.tsx
import React from 'react';
import {Check} from 'lucide-react';

// 1. Las Variantes de Figma se vuelven Tipos
type ExerciseType = 'Weight_Reps' | 'Bodyweight_Reps' | 'Duration';

interface SetRowProps {
    setNumber: number;
    previousHistory?: string;
    type: ExerciseType;
    isCompleted: boolean;
    onToggleComplete: () => void;
}

export const SetRow: React.FC<SetRowProps> = ({
                                                  setNumber,
                                                  previousHistory,
                                                  type,
                                                  isCompleted,
                                                  onToggleComplete
                                              }) => {
    return (
        // Auto Layout Horizontal, Alineación Centro, Padding Vertical
        <div className="flex flex-row items-center w-full py-2 gap-2">

            {/* Left Side: Fill Container (flex-1) para empujar lo demás a la derecha */}
            <div className="flex flex-1 items-center gap-3">
                <span className="text-gray-400 text-sm font-bold w-6 text-center">
                    {setNumber}
                </span>
                <span className="text-gray-400 text-sm truncate">
                    {previousHistory || '-'}
                </span>
            </div>

            {/* Right Side: Inputs dinámicos según la Variante (Type) */}
            <div className="flex flex-row items-center gap-2">

                {/* Lógica de Variantes (Mostrar/Ocultar como hicimos en Figma) */}
                {type === 'Weight_Reps' && (
                    <div
                        className="w-16 h-9 bg-gray-800 rounded-md flex items-center justify-center border border-gray-400/20">
                        <span className="text-gray-400 text-sm">kg</span>
                    </div>
                )}

                {(type === 'Weight_Reps' || type === 'Bodyweight_Reps') && (
                    <div
                        className="w-16 h-9 bg-gray-800 rounded-md flex items-center justify-center border border-gray-400/20">
                        <span className="text-gray-400 text-sm">reps</span>
                    </div>
                )}

                {type === 'Duration' && (
                    <div
                        className="w-20 h-9 bg-gray-800 rounded-md flex items-center justify-center border border-gray-400/20">
                        <span className="text-gray-400 text-sm">mm:ss</span>
                    </div>
                )}

                {/* CheckButton Átomo */}
                <button
                    onClick={onToggleComplete}
                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors
                        ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                    <Check size={18}/>
                </button>
            </div>
        </div>
    );
};