import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/login', { replace: true });
    };

    return (
        <button onClick={handleLogout} className="btn_logout text-black px-4 rounded-xl bg-c2 w-[200px] font-medium font-[Montserrat]">
            Logout
        </button>
    );
};

export default LogoutButton;