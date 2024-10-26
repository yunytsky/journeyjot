import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../api";

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const getUser = async () => {
      try {
        const res = await auth();
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
   }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/auth" />;
    
};

export default ProtectedRoute;