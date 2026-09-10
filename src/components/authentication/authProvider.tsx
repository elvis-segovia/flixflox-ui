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

    const applySession = useCallback((data: { username?: string; role?: string }) => {
        setIsAuthenticated(true);
        setUsername(data?.username || 'None');
        setUserRole(data?.role || 'viewer');
        setError(null);
    }, []);

    const clearSession = useCallback((message: string | null = null) => {
        setIsAuthenticated(false);
        setUsername('None');
        setUserRole('viewer');
        setError(message);
    }, []);

    const checkAuthentication = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await loginCtrl.checkAuth().catch((err: unknown) => {
                console.error('Auth check failed:', err);
                return null;
            });

            if (res?.status === 200) {
                applySession(res.data);
                return;
            }

            // The check failed: exactly one refresh attempt, then give up.
            const refreshRes = await loginCtrl.refreshToken().catch((err: unknown) => {
                console.error('Token refresh failed:', err);
                return null;
            });

            if (refreshRes?.status === 200) {
                applySession(refreshRes.data);
            } else {
                clearSession('Authentication check failed');
            }
        } finally {
            setIsLoading(false);
        }
    }, [applySession, clearSession]);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    const login = async (username: string, password: string, role: string = 'viewer'): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await loginCtrl.login(username, password, role);
            if (res.status === 200) {
                applySession({ username: res.data.username, role });
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
                clearSession();
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