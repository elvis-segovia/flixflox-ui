import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<any|null>(null);
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <AuthContext.Provider value={{ isAuthenticated: false }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};  