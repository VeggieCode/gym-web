import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './application/context/AuthContext';
import { ProtectedRoute } from './presentation/components/ProtectedRoute';
import { Login } from './presentation/pages/Login';
import { PlanList } from './presentation/components/PlanList';
import { PlanForm } from './presentation/components/PlanForm';
import { RoutineForm } from './presentation/components/RoutineForm';
import {useState} from "react";

// Un componente de navegación simple
const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', gap: '15px' }}>
            <Link to="/" style={{ color: 'white' }}>Inicio</Link>
            {user?.role === 'dueño' && <Link to="/crear-plan" style={{ color: 'white' }}>Crear Plan</Link>}
            <Link to="/crear-rutina" style={{ color: 'white' }}>Crear Rutina</Link>
            <div style={{ marginLeft: 'auto' }}>
                Hola, {user?.name} ({user?.role}) | <button onClick={logout}>Salir</button>
            </div>
        </nav>
    );
};

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const recargarLista = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas Públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/no-autorizado" element={<h2 style={{padding: '20px'}}>❌ No tienes permisos de dueño.</h2>} />

                    {/* Rutas Protegidas Generales (Cualquier usuario logueado) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<><Navbar /><div style={{padding: '20px'}}><PlanList onPlanArchivado={recargarLista}/></div></>} />
                        <Route path="/crear-rutina" element={<><Navbar /><div style={{padding: '20px'}}><RoutineForm /></div></>} />
                    </Route>

                    {/* Rutas Protegidas de Autorización Estricta (Solo DUEÑOS) */}
                    <Route element={<ProtectedRoute requiredRole="dueño" />}>
                        <Route path="/crear-plan" element={<><Navbar /><div style={{padding: '20px'}}><PlanForm onPlanCreado={recargarLista}/></div></>} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;