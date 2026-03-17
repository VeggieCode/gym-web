import React, {type ButtonHTMLAttributes } from 'react';

// 1. Definimos las variantes de Figma como tipos estrictos
export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// 2. Extendemos los props nativos de un botón HTML
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  isFullWidth = false,
                                                  className = '',
                                                  disabled,
                                                  ...props
                                              }) => {

    // 3. Diccionarios de estilos
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-primary-main text-text-primary hover:bg-primary-hover active:bg-orange-700 shadow-level1",
        outline: "border-2 border-primary-main text-primary-main hover:bg-surface-hover active:bg-surface",
        ghost: "text-primary-main hover:bg-surface-hover active:bg-surface"
    };

    const sizes = {
        sm: "px-sm py-1 text-sm h-8",
        md: "px-md py-2 text-base h-12",
        lg: "px-lg py-3 text-lg h-14"
    };

    const widthStyle = isFullWidth ? "w-full" : "w-auto";

    // 4. Concatenamos todas las clases
    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`.trim();

    return (
        <button
            className={combinedClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};