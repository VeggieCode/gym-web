import type { Plan } from '../entities/Plan';

// Este es el contrato. A la UI no le importa si usamos Axios o Fetch.
export interface PlanRepository {
    obtenerActivos(): Promise<Plan[]>;
    crear(nombre: string, nivel: string, precio: number): Promise<Plan>;
    archivar(id: number): Promise<void>;
}