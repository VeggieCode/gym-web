import { Routine } from '../../domain/entities/Routine';
import type { RoutineRepository } from '../../domain/repositories/RoutineRepository';
import { RoutineMapper } from '../mappers/RoutineMapper';

// Importa tu cliente de axios o fetch aquí. Asumo que tienes algo como:
// import apiClient from './apiClient';

export class RoutineApi implements RoutineRepository {
    // Si tu url base ya está configurada, ajusta la ruta
    private baseUrl = 'http://127.0.0.1/api';

    async saveRoutine(routine: Routine): Promise<Routine> {
        // 1. Convertimos el dominio al JSON requerido
        const dto = RoutineMapper.toDto(routine);

        // 2. Hacemos la petición
        const response = await fetch(`${this.baseUrl}/rutinas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dto)
        });

        if (!response.ok) {
            // Aquí podríamos atrapar los errores 422 de Laravel
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al guardar la rutina en el servidor');
        }

        const responseData = await response.json();

        // 3. Convertimos la respuesta exitosa de vuelta a nuestra Entidad Pura
        return RoutineMapper.toDomain(responseData.data);
    }
}