import { Routine } from '../entities/Routine';

export interface RoutineRepository {
    saveRoutine(routine: Routine): Promise<Routine>;
    // Aquí después agregaremos getActiveRoutines()
}