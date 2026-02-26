import { Routine } from '../../domain/entities/Routine';
import { Exercise } from '../../domain/entities/Exercise';

// Reflejo exacto del JSON de Laravel
export interface ExerciseDto {
    id?: number | null;
    nombre: string;
    series: number;
    repeticiones: number;
}

export interface RoutineDto {
    id?: number | null;
    nombre: string;
    dias_asignados: string[];
    ejercicios: ExerciseDto[];
}

export class RoutineMapper {
    // Convierte la respuesta de Laravel a nuestra Entidad Pura
    static toDomain(raw: RoutineDto): Routine {
        const exercises = raw.ejercicios.map(
            (ej) => new Exercise(ej.nombre, ej.series, ej.repeticiones, ej.id ?? undefined)
        );

        return new Routine(
            raw.nombre,
            raw.dias_asignados,
            exercises,
            raw.id ?? undefined
        );
    }

    // Convierte nuestra Entidad Pura al JSON que Laravel espera
    static toDto(domain: Routine): RoutineDto {
        return {
            id: domain.id ?? null,
            nombre: domain.name,
            dias_asignados: domain.assignedDays,
            ejercicios: domain.exercises.map((ej) => ({
                id: ej.id ?? null,
                nombre: ej.name,
                series: ej.sets,
                repeticiones: ej.reps
            }))
        };
    }
}