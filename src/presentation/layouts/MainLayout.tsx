import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
            <Navbar />

            {/* Este es el contenedor principal que le da formato a tus pantallas */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* Aquí adentro React Router inyectará las pantallas (PlanList, RoutineForm, etc) */}
                <Outlet />
            </main>
        </div>
    );
};