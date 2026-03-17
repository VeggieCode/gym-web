import React, {forwardRef, useId} from 'react';

export interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isTextArea?: boolean;
    rows?: number;
}
export const InputGroup = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputGroupProps>(
    ({label, error, className = '', id, leftIcon, rightIcon, isTextArea, rows, ...props}, ref) => {
        // Generamos un ID único por si el usuario no pasa uno, para enlazar el label con el input (Accesibilidad)
        const generatedId = useId();
        const inputId = id || generatedId;

        const baseInputStyles = "w-full h-12 bg-surface text-text-primary rounded-md border transition-colors duration-200 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed";

        const stateStyles = error
            ? "border-error-main focus:border-error-main focus:ring-error-main"
            : "border-border-subtle focus:border-primary-main focus:ring-primary-main hover:border-gray-400";

        // Ajustamos el padding interno si hay íconos
        const paddingStyles = `${leftIcon ? 'pl-10' : 'pl-md'} ${rightIcon ? 'pr-10' : 'pr-md'}`;

        return (
            <div className={`flex flex-col gap-sm w-full ${className}`}>
                {/* Label */}
                <label htmlFor={inputId} className="text-sm font-body text-text-secondary">
                    {label}
                </label>

                {/* Contenedor relativo para posicionar íconos si los hay */}
                <div className="relative flex items-center">

                    {leftIcon && (
                        <div className="absolute left-3 text-text-secondary flex items-center justify-center">
                            {leftIcon}
                        </div>
                    )}

                    {isTextArea ? (
                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            id={inputId}
                            rows={rows || 3}
                            className={`${baseInputStyles} ${stateStyles} py-3 px-md resize-none`}
                            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        />
                    ) : (
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            id={inputId}
                            className={`${baseInputStyles} ${stateStyles} ${paddingStyles}`}
                            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                        />
                    )}

                    {rightIcon && (
                        <div className="absolute right-3 text-text-secondary flex items-center justify-center">
                            {rightIcon}
                        </div>
                    )}

                </div>

                {/* Mensaje de Error */}
                {error && (
                    <span className="text-xs text-error-main mt-1">
            {error}
          </span>
                )}
            </div>
        );
    }
);

// Es buena práctica darle un nombre cuando usamos forwardRef
InputGroup.displayName = 'InputGroup';