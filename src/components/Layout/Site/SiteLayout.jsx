import React, { useState, useEffect } from "react";
import Navbar from "./SiteNavbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setIsAdmin(data.user?.role === "admin");
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const handleGoAdmin = () => {
    navigate("/admin/users");
  };

  return (
    <div>
      <Navbar />
      {!loading && isAdmin && (
        <button
          onClick={handleGoAdmin}
          className="fixed bg-[#232321] text-white opacity-70 z-50 cursor-pointer right-0 rounded-tl-2xl rounded-bl-2xl w-[200px] h-20 shadow-2xl flex justify-center items-center font-bold transition-opacity duration-300 hover:opacity-100"
          aria-label="Go To Admin Panel"
        >
          Go To Admin Panel
        </button>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;