import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authProvider";
import LoadingPage from "../../pages/admin/loading";

type UserRole = "admin" | "user" | "guest";

export const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated, isLoading, error, userRole } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (isLoading) {
        return <LoadingPage />;
    }

    // Handle error or unauthenticated state
    if (error || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect based on user role
    const redirectPath = {
        admin: "/dashboard",
        user: "/",
        guest: "/login",
    }[userRole as UserRole] || "/";
    

    // Redirect based on user role
    // if (location.pathname !== redirectPath) {
    //     return <Navigate to={redirectPath} replace />;
    // }

    // Render protected content if authenticated
    return <Outlet />;
};