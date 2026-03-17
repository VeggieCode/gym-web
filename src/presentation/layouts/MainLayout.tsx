import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Plus} from "lucide-react";
import {BottomNavBar} from "../components/ui/BottomNavBar.tsx";

type TabType = 'home' | 'agenda' | 'profile' | 'routines';
export const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('home');

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        if (tab === 'home') navigate('/');
    };
    return (
        <div className="min-h-screen bg-base pb-24 relative flex justify-center">


            <main style={{
                maxWidth: '1020px',
                margin: '0 auto',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Outlet />
            </main>
            {/* FAB - Lo anclamos en relación al contenedor móvil */}
            <button
                className="absolute bottom-6 right-md w-14 h-14 bg-primary-main text-text-primary rounded-full shadow-level2 flex items-center justify-center hover:bg-primary-hover active:scale-90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:ring-primary-main z-20 fixed md:absolute"
                style={{ bottom: '88px' }} // 72px del nav + 16px de margen
                onClick={() => navigate('/crear-rutina')}
            >
                <Plus size={28} />
            </button>


            {/* Barra de Navegación Inferior centrada para pantallas grandes */}
            <div className="fixed bottom-0 left-0 w-full flex justify-center z-20">
                <div className="w-full max-w-md">
                    <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
                </div>
            </div>
        </div>
    );
};