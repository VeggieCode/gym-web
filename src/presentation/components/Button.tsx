import React, { useState } from 'react';
import {theme} from "../design-system/theme.ts";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <button
            {...props}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
                padding: '14px',
                backgroundColor: isHover ? theme.colors.primary.hover : theme.colors.primary.main,
                color: theme.colors.text.inverse,
                border: 'none',
                borderRadius: theme.borderRadius.md,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                ...props.style // Permite sobreescribir estilos si es estrictamente necesario
            }}
        >
            {children}
        </button>
    );
};