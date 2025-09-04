import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.user.role === 'admin') {
          setIsAdmin(true);
        } 
        else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      } 
    };

    checkAuth();
  }, [navigate]);


  return isAdmin ? <Outlet /> : null;
};

export default ProtectedRoute;