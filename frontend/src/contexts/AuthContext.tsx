import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import authService from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        if (token) { setAuthenticated(true) }
    }, []);

    const login = async (
        username: string,
        password: string
    ) => {
        await authService.login({ username, password });
        setAuthenticated(true)
    };
    
    const logout = () => {
        authService.logout();
        setUser(null);
        setAuthenticated(false);
    };

    return(
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout
            } as AuthContextType}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}