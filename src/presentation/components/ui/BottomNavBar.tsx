import React from 'react';
import {Home, Calendar, User, Dumbbell, Code, Component, Diamond} from 'lucide-react';
import {Link} from "react-router-dom";
import {useAuth} from "../../../application/context/AuthContext.tsx";

type TabType = 'home' | 'agenda' | 'profile' | 'routines';

interface BottomNavBarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
    const {user, logout} = useAuth();

    // Un pequeño componente interno para cada botón de la barra
    const NavItem = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => {
        const isActive = activeTab === id;

        return (
            <button
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main rounded-md
          ${isActive ? 'text-primary-main' : 'text-text-secondary hover:text-text-primary'}`}
            >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-body font-semibold">{label}</span>
            </button>
        );
    };

    return (
        // position fixed al fondo (bottom-0), ancho completo, con un blur sutil (opcional)
        <div className="fixed bottom-0 left-0 w-full h-[72px] bg-surface/95 backdrop-blur-sm border-t border-border-subtle flex flex-row items-center justify-around px-2 pb-safe">

            <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                <NavItem id="home" icon={Home} label="Inicio" />
            </Link>

            {user?.role === 'dueño' && (
                <Link to="/crear-plan" style={{color: 'white', textDecoration: 'none'}}>
                    <NavItem id="planes" icon={Diamond} label="Planes" />
                </Link>
            )}

            <Link to="/crear-rutina" style={{color: 'white', textDecoration: 'none'}}>
                <NavItem id="routines" icon={Dumbbell} label="Rutinas" />
            </Link>

            <Link to="/agendar">
                <NavItem id="agenda" icon={Calendar} label="Agenda" />
            </Link>

            <Link to="/tokens" style={{color: 'white', textDecoration: 'none'}}>
                <NavItem id="tokens" icon={Code} label="Design Tokens" />
            </Link>

            <Link to="/preview" style={{color: 'white', textDecoration: 'none'}}>
                <NavItem id="components" icon={Component} label="Components" />
            </Link>
        </div>
    );
};