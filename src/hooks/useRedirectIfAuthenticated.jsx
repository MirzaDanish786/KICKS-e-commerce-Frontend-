import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking auth status", error);
      }
    };

    checkIsLoggedIn();
  }, [navigate]);
};

export default useRedirectIfAuthenticated;
