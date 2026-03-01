import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';
import {Button} from "../components/Button.tsx";
import {Input} from "../components/Input.tsx";
import {theme} from "../design-system/theme.ts";

export const Login: React.FC = () => {
    const [email, setEmail] = useState('admin@tlatoltech.com.mx');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '1.8rem' }}>Bienvenido de vuelta</h2>
            <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Ingresa tus credenciales para acceder a tu panel.</p>

            {error && (
                <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
                <Input
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ejemplo@gym.com"
                />
                <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                />
                <Button type="submit">
                    Iniciar Sesión
                </Button>
            </form>
        </div>
    );
};