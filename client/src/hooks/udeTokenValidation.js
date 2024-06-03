// useTokenValidation.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            toast.error("Session expired. Please Log In again");
            navigate("/login"); // redirecting to login page
          }
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 5000);
    
    return () => {
      clearInterval(intervalId); // Clear Interval on component unmount
    };
  }, [navigate]);
};

export default useTokenValidation;
