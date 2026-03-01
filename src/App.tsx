import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './application/context/AuthContext';
import { ProtectedRoute } from './presentation/components/ProtectedRoute';
import { Login } from './presentation/pages/Login';
import { PlanList } from './presentation/components/PlanList';
import { PlanForm } from './presentation/components/PlanForm';
import { RoutineForm } from './presentation/components/RoutineForm';
import {useState} from "react";
import {MainLayout} from "./presentation/layouts/MainLayout.tsx";
import {AuthLayout} from "./presentation/layouts/AuthLayout.tsx";

function App() {
    const [_refreshKey, setRefreshKey] = useState(0);
    const recargarLista = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ==========================================
                        RUTAS DE AUTENTICACIÓN (Split Screen)
                        ========================================== */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/registro" element={<Register />} /> <-- ¡Listo para el futuro! */}
                    </Route>

                    {/* ==========================================
                    RUTAS CON LAYOUT PRINCIPAL (Con Navbar y Padding)
                    ========================================== */}
                    <Route element={<MainLayout />}>

                        {/* Cualquier usuario autenticado */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<PlanList  onPlanArchivado={recargarLista}/>} />
                            <Route path="/crear-rutina" element={<RoutineForm />} />
                        </Route>

                        {/* Solo dueños */}
                        <Route element={<ProtectedRoute requiredRole="dueño" />}>
                            <Route path="/crear-plan" element={<PlanForm  onPlanCreado={recargarLista}/>} />
                        </Route>

                        {/* Pantalla de error de permisos, pero manteniendo el Navbar para que pueda navegar */}
                        <Route path="/no-autorizado" element={
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2 style={{ color: '#e74c3c' }}>❌ Acceso Denegado</h2>
                                <p>No tienes permisos de dueño para ver esta sección.</p>
                            </div>
                        } />

                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;