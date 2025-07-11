import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { LoginController } from "../../controllers";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    username: string;
    userRole: string;
    error: string | null;
    login: (username: string, password: string, role?: string) => Promise<void>;
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
    const [userRole, setUserRole] = useState('viewer');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const checkAuthentication = useCallback(async () => {
        try {
            const res = await loginCtrl.checkAuth();
            if (res.status === 200) {
                setIsAuthenticated(true);
                setUsername(res.data.user.username);
                setUserRole(res.data.user.role || 'viewer');
            } else {
                const res = await loginCtrl.refreshToken();
                if (res.status !== 200) {
                    setIsAuthenticated(false);
                    setUsername('None');
                    setUserRole('viewer');
                    setError('Authentication check failed');
                }
            }
        } catch (err) {
            setIsAuthenticated(false);
            setUsername('None');
            setUserRole('viewer');
            setError('Authentication check failed');
        }
    }, [navigate]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await loginCtrl.checkAuth();
                if (res.status === 200) {
                    setIsAuthenticated(true);
                    setUsername(res.data.user.username);
                    setUserRole(res.data.user.role || 'viewer');
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setIsAuthenticated(false);
                setUsername('None');
                setUserRole('viewer');
                setError('Authentication check failed');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    const login = async (username: string, password: string, role: string = 'viewer'): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await loginCtrl.login(username, password, role);
            if (res.status === 200) {
                setIsAuthenticated(true);
                setUsername(res.data.user.username);
                setUserRole(role);
                // Navigate based on role
                if (role === 'admin') {
                    navigate("/dashboard/home");
                } else {
                    navigate("/");
                }
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
                setUserRole('viewer');
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
        userRole,
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