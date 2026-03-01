import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('admin@tlatoltech.com.mx');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // Redirige al inicio si es exitoso
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};