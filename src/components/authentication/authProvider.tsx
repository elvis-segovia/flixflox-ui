import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { LoginController } from "../../controllers";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    username: string;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const loginCtrl = new LoginController();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('None');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await loginCtrl.checkAuth();
                if (res.status === 200) {
                    setIsAuthenticated(true);
                    setUsername(res.data.user.username);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setIsAuthenticated(false);
                setUsername('None');
                setError('Authentication check failed');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const checkAuthentication = useCallback(async () => {
        try {
            const res = await loginCtrl.checkAuth();
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error('Authentication check failed:', err);
            setIsAuthenticated(false);
            setUsername('None');
            setError('Authentication check failed');
        } 
    }, [navigate]);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await loginCtrl.login(username, password);
            if (res.status === 200) {
                setIsAuthenticated(true);
                setUsername(res.data.user.username);
                navigate("/dashboard/home");
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await loginCtrl.logout();
            if (res.status === 200) {
                setIsAuthenticated(false);
                setUsername('None');
                navigate("/");
            }
        } catch (err) {
            console.error('Logout failed:', err);
            setError('Logout failed. Please try again.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        username,
        error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 