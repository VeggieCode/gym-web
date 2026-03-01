import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';
import { apiClient } from './apiClient';

export class AuthApi implements AuthRepository {
    async login(email: string, password: string): Promise<{ token: string; user: User }> {
        try {
            const response = await apiClient.post('/login', { email, password });
            const { token, usuario } = response.data.data;

            const user = new User(usuario.id, usuario.nombre, usuario.email, usuario.rol);

            // Guardamos la sesión en el navegador (Infraestructura pura)
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));

            return { token, user };
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
        }
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    getUser(): User | null {
        const userStr = localStorage.getItem('auth_user');
        if (!userStr) return null;
        const parsed = JSON.parse(userStr);
        return new User(parsed.id, parsed.name, parsed.email, parsed.role);
    }
}