import { Outlet } from "react-router-dom";
import { useAuth } from "./authProvider"
import LoginForm from "../../pages/login";

export const ProtectedRoutes: React.FC = () => {
    const ctx = useAuth();
    if (!ctx.isAuthenticated) {
        return <LoginForm />;
    }

    return <Outlet />;
}