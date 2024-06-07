import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomerProfile from '../../pages/customer/profile';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import LogoutButton from '../primary/logoutbtn';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogOut() {

  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/', { replace: true });
    };

  return (
    <CustomerProfile>
     
     <div className="z-100 -mt-[300px] ml-[350px] h-[350px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[350px] sm:w-auto bg-gradient-to-r from-white to-c2 rounded-2xl z-80"
          shadow={true}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
            <Typography className="-mb-3 text-xl text-black font-bold font-[Montserrat]">
                Hello Username
              </Typography>
              <Typography className="-mb-3 text-black font-medium font-[Montserrat]">
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
              </Typography>
              <Typography className="-mb-3 text-black font-bold font-[Montserrat]">
                Are you sure you want to log out?  
              </Typography>
              <Typography onClick={handleLogout} className="text-c2 px-4 rounded-xl bg-deep-orange-800 hover:bg-c5 hover:text-c1 h-10 items-center mt-2 pt-2 w-[200px] font-bold font-[Montserrat]  hover:duration-400 hover:transition-transform duration-500 ease-in-out hover:scale-105">
                Confirm & Log Out  
              </Typography>       
              </div>
              <div className="flex grid-cols-3 gap-10">
              <Link to="/profileUser/AccountDetails/:id">
              <Button
                className="mt-5 w-[250px]  hover:duration-400 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-xl text-white text-md font-[Montserrat]"
              >
                Account Details
              </Button>
              </Link>
              <Link to="/profileUser/MyOrders/:id">
              <Button
                className="mt-5 w-[250px]  hover:duration-400 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-xl text-white text-md font-[Montserrat]"
              >
                Orders
              </Button>
              </Link>
              <Link to="/profileUser/Addresses/:id">
              <Button
                className="mt-5 w-[250px]  hover:duration-400 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-xl text-white text-md font-[Montserrat]"
              >
                Addresses
              </Button>
              </Link>
              </div>
          </form>
        </Card>
      </div>
    </CustomerProfile>
  );
}

export default LogOut
