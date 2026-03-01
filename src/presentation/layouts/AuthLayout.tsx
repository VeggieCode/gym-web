import React from 'react';
import { Outlet } from 'react-router-dom';
import fondoImg from '../../assets/vertical_gym_person.jpg';
export const AuthLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>

            {/* Mitad Izquierda: Branding / Imagen Inspiracional */}
            <div style={{
                flex: 1,
                backgroundColor: '#2c3e50',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '40px',
                backgroundImage: `url(${fondoImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>Gym Admin</h1>
                <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '400px', opacity: 0.8 }}>
                    Gestiona tus rutinas, controla tus planes y lleva el rendimiento al siguiente nivel.
                </p>
            </div>

            {/* Mitad Derecha: Contenedor del Formulario (Login/Register) */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
                }}>
                    {/* Aquí React Router inyectará <Login /> o <Register /> */}
                    <Outlet />
                </div>
            </div>

        </div>
    );
};