
export type ValidationErrors = {
    [key: string]: string[];
};

export type User = {
    id: number;
    username: string;
    password: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;

export type SessionUser = {
    user: UserWithoutPassword;
};

export type Task = {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
};

export type AlertMessage = {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
};

