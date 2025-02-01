import { createContext, ReactNode, useContext, useState } from "react";
import { LoginController } from "../../controllers";

const AuthContext = createContext<any | null>(null);
interface AuthProviderProps {
    children: ReactNode;
}

const loginCtrl = new LoginController();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username: string, password: string) => {
        loginCtrl.login(username, password)
            .then((res) => {
                console.log("Login response:", res);
                if (res.status === 200) {
                    setIsAuthenticated(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};  