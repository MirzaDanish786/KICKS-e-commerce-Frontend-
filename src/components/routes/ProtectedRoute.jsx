import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
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