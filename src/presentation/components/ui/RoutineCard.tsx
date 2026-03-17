import React from 'react';

interface RoutineCardProps {
    day: string;
    title: string;
    tags: string;
    onClick?: () => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ day, title, tags, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left bg-surface p-md rounded-md shadow-level1 border border-border-subtle transition-all duration-200 hover:bg-surface-hover hover:border-gray-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main"
        >
            {/* Título: "Lunes: Pecho y Tríceps" */}
            <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                {day}: {title}
            </h3>

            {/* Subtítulo / Metadatos: "Fuerza • 6 ejercicios" */}
            <p className="text-sm font-body text-text-secondary">
                {tags}
            </p>
        </button>
    );
};