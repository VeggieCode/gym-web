import type { Plan } from '../../domain/entities/Plan';

export class PlanMapper {
    // Traducimos el JSON de Laravel a nuestra Entidad estricta
    static fromApiToDomain(apiData: any): Plan {
        return {
            id: apiData.id,
            nombre: apiData.nombre,
            nivel: apiData.nivel,
            precio: Number(apiData.precio),
            activo: Boolean(apiData.activo)
        };
    }
}