export interface AuthState{
    loading: boolean;
    isLoggedIn: boolean;
    message: string | null;
    isSuccess: boolean;
    user: User | null;
}

export interface User {
    userId: number | null;
    emailId: string;
    fullName?: string;
}