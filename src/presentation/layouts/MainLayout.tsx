import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import {Plus} from "lucide-react";
import {BottomNavBar} from "../components/ui/BottomNavBar.tsx";

export const MainLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'agenda' | 'profile' | 'routines'>('home');
    return (
        <div className="min-h-screen bg-base pb-24 relative">
            <Navbar />

            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Outlet />
            </main>

            {/* FAB (Floating Action Button) - Anclado abajo a la derecha, arriba del BottomNavBar */}
            <button
                className="fixed bottom-[88px] right-md w-14 h-14 bg-primary-main text-text-primary rounded-full shadow-level2 flex items-center justify-center hover:bg-primary-hover active:scale-90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:ring-primary-main z-20"
                onClick={() => console.log('Crear nueva rutina')}
            >
                <Plus size={28} />
            </button>

            {/* Barra de Navegación Inferior */}
            <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};