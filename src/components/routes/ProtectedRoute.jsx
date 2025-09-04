import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  // I assign isAuthenticated = true tempory to access all routes;
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } 
        else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } 
    };

    checkAuth();
  }, [navigate]);


  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;