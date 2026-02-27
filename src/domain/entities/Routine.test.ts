import { Exercise } from './Exercise';
import { Routine } from './Routine';
import { describe, test, expect } from 'vitest';

describe('Reglas de Negocio del Gimnasio: Rutinas y Ejercicios', () => {

    test('❌ Un ejercicio no puede tener series negativas o cero', () => {
        // Ejecutamos la acción y esperamos que la clase lance nuestro error
        expect(() => {
            new Exercise("Press de Banca", 0, 10);
        }).toThrow("Las series y repeticiones de 'Press de Banca' deben ser mayores a cero.");
    });

    test('❌ Una rutina no puede guardarse vacía (sin ejercicios)', () => {
        expect(() => {
            new Routine("Hipertrofia", ["Lunes"], []); // Array de ejercicios vacío
        }).toThrow("Una rutina debe contener al menos un ejercicio.");
    });

    test('✅ Una rutina válida se instancia correctamente', () => {
        const ejercicio = new Exercise("Sentadilla", 4, 12);
        const rutina = new Routine("Pierna Pesada", ["Miércoles"], [ejercicio]);

        expect(rutina.name).toBe("Pierna Pesada");
        expect(rutina.exercises.length).toBe(1);
    });
});