// types/User.ts
export interface User {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    token: string | null;
}
