import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {

    const { user, loading } = useAuth();

    // Wait until we know whether the user is logged in
    if (loading) {
        return <div>Loading...</div>;
    }

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in
    return <Outlet />;
}

export default ProtectedRoute;