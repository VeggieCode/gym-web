export class Exercise {
    // @ts-ignore
    constructor(
        public readonly name: string,
        public readonly sets: number,
        public readonly reps: number,
        public readonly id?: number
    ) {
        if (sets <= 0 || reps <= 0) {
            throw new Error(`Las series y repeticiones de '${name}' deben ser mayores a cero.`);
        }
        if (name.trim() === '') {
            throw new Error("El nombre del ejercicio no puede estar vacío.");
        }
    }
}