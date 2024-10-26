import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = () => {
    const {user, loading} = useContext(UserContext);

    if (loading) {
      return <Loading/>;
    }

    return user ? <Outlet /> : <Navigate to="/auth" />;
    
};

export default ProtectedRoute;