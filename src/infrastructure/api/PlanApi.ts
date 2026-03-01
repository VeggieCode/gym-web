import type { Plan } from '../../domain/entities/Plan';
import type { PlanRepository } from '../../domain/repositories/PlanRepository';
import { PlanMapper } from '../mappers/PlanMapper';
import {apiClient} from "./apiClient.ts";

export class PlanApi implements PlanRepository {
    async obtenerActivos(): Promise<Plan[]> {
        const response = await apiClient.get('/planes');
        return response.data.data.map(PlanMapper.fromApiToDomain);
    }

    async crear(nombre: string, nivel: string, precio: number): Promise<Plan> {
        try {
            const response = await apiClient.post('/planes', { nombre, nivel, precio });
            return PlanMapper.fromApiToDomain(response.data.data);
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw new Error('Error de conexión con el servidor');
        }
    }
    async archivar(id: number): Promise<void> {
        try {
            await apiClient.patch(`/planes/${id}/archivar`);
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw new Error('Error al intentar archivar el plan');
        }
    }
}

export const planApi = new PlanApi();