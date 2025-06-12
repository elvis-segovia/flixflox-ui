import { createContext, ReactNode, useContext, useState } from "react";
import { LoginController } from "../../controllers";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any | null>(null);
interface AuthProviderProps {
    children: ReactNode;
}

const loginCtrl = new LoginController();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('None');
    const navigate = useNavigate();

    const login = (username: string, password: string) => {
        loginCtrl.login(username, password)
            .then((res) => {
                if (res.status === 200) {
                    setIsAuthenticated(true);
                    setUsername(res.data.user.username)
                    navigate("/dashboard/home");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const logout = () => {
        setIsAuthenticated(false);
        navigate("/")
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};  