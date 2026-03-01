import React from 'react';
import {theme} from "../design-system/theme.ts";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.colors.text.primary }}>
                {label}
            </label>
            <input
                {...props}
                style={{
                    padding: '12px',
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border}`,
                    outline: 'none',
                    fontSize: '1rem'
                }}
            />
        </div>
    );
};