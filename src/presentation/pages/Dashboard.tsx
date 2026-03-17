import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutineCard } from '../components/ui/RoutineCard'; // Asegúrate de que la ruta sea correcta

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Datos simulados (Luego vendrán de useGetPlanes o useGetRutinas)
    const weeklyRoutines = [
        { id: 1, day: 'Lunes', title: 'Pecho y Tríceps', tags: 'Fuerza • 6 ejercicios' },
        { id: 2, day: 'Martes', title: 'Espalda y Bíceps', tags: 'Fuerza • 6 ejercicios' },
        { id: 3, day: 'Miércoles', title: 'Pierna (Enfoque Cuádriceps)', tags: 'Fuerza • 6 ejercicios' },
        { id: 4, day: 'Jueves', title: 'Hombros y Abdomen', tags: 'Fuerza • 6 ejercicios' },
        { id: 5, day: 'Viernes', title: 'Brazos (Hipertrofia)', tags: 'Fuerza • 6 ejercicios' },
        { id: 6, day: 'Sábado', title: 'Pierna (Isquios y Glúteo)', tags: 'Fuerza • 6 ejercicios' },
    ];

    return (
        <>
            {/* Cabecera pegajosa */}
            <header className="px-md pt-10 pb-4 sticky top-0 bg-base/95 backdrop-blur-sm z-10">
                <h1 className="text-3xl font-heading font-bold text-text-primary">Tu Semana</h1>
            </header>

            {/* Lista de Tarjetas */}
            <main className="px-md flex flex-col gap-4 pb-4">
                {weeklyRoutines.map((routine) => (
                    <RoutineCard
                        key={routine.id}
                        day={routine.day}
                        title={routine.title}
                        tags={routine.tags}
                        // Navegamos a la ejecución de la rutina al hacer clic
                        onClick={() => navigate('/routine-execution')}
                    />
                ))}
            </main>
        </>
    );
};