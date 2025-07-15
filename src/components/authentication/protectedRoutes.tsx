import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import LoadingPage from "../../pages/admin/loading";

export const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated, isLoading, error } = useAuth();
    // Show loading state while checking authentication
    if (isLoading) {
        return <LoadingPage />;
    }

    // Handle error or unauthenticated state
    if (error || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    

    // Redirect based on user role
    // if (location.pathname !== redirectPath) {
    //     return <Navigate to={redirectPath} replace />;
    // }

    // Render protected content if authenticated
    return <Outlet />;
};