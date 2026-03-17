import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../application/context/AuthContext';
import {theme} from "../design-system/theme.ts";
import {Dumbbell} from "lucide-react";

function NavItem(props: { icon: React.JSX.Element, text: string, isActive: boolean }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: props.isActive ? theme.colors.primary.main : 'transparent',
            color: props.isActive ? 'white' : theme.colors.text.primary

        }}>
            {props.icon}
            <span>{props.text}</span>
        </div>
    );
}

export const Navbar: React.FC = () => {
    const {user, logout} = useAuth();

    return (
        <nav style={{
            padding: '15px 20px',
            background: '#2c3e50',
            color: 'white',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{margin: 0, fontSize: '1.2rem'}}>Gym Admin</h2>
            <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Inicio</Link>

            <NavItem icon={<Dumbbell size={24}/>} text="Mis Rutinas" isActive={false}/>

            {user?.role === 'dueño' && (
                <Link to="/crear-plan" style={{color: 'white', textDecoration: 'none'}}>Crear Plan</Link>
            )}
            <Link to="/crear-rutina" style={{color: 'white', textDecoration: 'none'}}>Crear Rutina</Link>

            <Link to="/tokens" style={{color: 'white', textDecoration: 'none'}}>Design Tokens</Link>

            <Link to="/preview" style={{color: 'white', textDecoration: 'none'}}>Components Preview</Link>

            <div style={{marginLeft: 'auto', display: 'flex', gap: '15px', alignItems: 'center'}}>
                <span style={{fontSize: '0.9rem'}}>
                    Hola, <strong>{user?.name}</strong> ({user?.role})
                </span>
                <button
                    onClick={logout}
                    style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Salir
                </button>
            </div>
        </nav>
    );
};