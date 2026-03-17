import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';
import {Button} from "../components/Button.tsx";
import {InputGroup} from "../components/InputGroup.tsx";

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
            {/* Título de la app */}
            <div className="text-center mb-4">
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                    Bienvenido al Gimnasio
                </h1>
                <p className="text-text-secondary mt-2">
                    Ingresa tus credenciales para continuar
                </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">

                <InputGroup
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    placeholder="tu@correo.com"
                    onChange={e => setEmail(e.target.value)}
                    required
                    error={error}
                />

                <InputGroup
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    error={error}
                />

                <div className="mt-4">
                    <Button type="submit" isFullWidth>
                        Iniciar Sesión
                    </Button>
                </div>
            </form>
        </div>
    );
};