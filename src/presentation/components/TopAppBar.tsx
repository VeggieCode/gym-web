import React from 'react';
import { X, ChevronLeft } from 'lucide-react';

interface TopAppBarProps {
    title: string;
    onBack?: () => void;
    onSave?: () => void;
    saveLabel?: string;
    backIcon?: 'close' | 'back';
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
                                                        title,
                                                        onBack,
                                                        onSave,
                                                        saveLabel = 'Guardar',
                                                        backIcon = 'close'
                                                    }) => {
    return (
        <div className="sticky top-0 z-20 w-full h-14 px-md bg-base/95 backdrop-blur-sm flex items-center justify-between border-b border-border-subtle">

            {/* Botón de regreso / cerrar */}
            <button
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-start text-text-primary hover:text-primary-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main rounded-md"
            >
                {backIcon === 'close' ? <X size={24} /> : <ChevronLeft size={28} />}
            </button>

            {/* Título Central */}
            <h2 className="text-lg font-heading font-bold text-text-primary absolute left-1/2 -translate-x-1/2">
                {title}
            </h2>

            {/* Botón de Guardar (Solo se muestra si pasas la prop onSave) */}
            <div className="w-16 flex justify-end">
                {onSave && (
                    <button
                        onClick={onSave}
                        className="text-primary-main font-semibold text-sm hover:text-primary-hover active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main rounded-md px-2 py-1"
                    >
                        {saveLabel}
                    </button>
                )}
            </div>

        </div>
    );
};