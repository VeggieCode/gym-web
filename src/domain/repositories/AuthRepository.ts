import { User } from '../entities/User';

export interface AuthRepository {
    login(email: string, password: string): Promise<{ token: string; user: User }>;
    logout(): void;
    getToken(): string | null;
    getUser(): User | null;
}