import { Exercise } from './Exercise';

export class Routine {
    // @ts-ignore
    constructor(
        public readonly name: string,
        public readonly assignedDays: string[],
        public readonly exercises: Exercise[],
        public readonly id?: number
    ) {
        if (name.trim() === '') {
            throw new Error("La rutina debe tener un nombre.");
        }
        if (assignedDays.length === 0) {
            throw new Error("Debes asignar al menos un día a la rutina.");
        }
        if (exercises.length === 0) {
            throw new Error("Una rutina debe contener al menos un ejercicio.");
        }
    }
}