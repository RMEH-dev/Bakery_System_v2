import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/pagelayout";
import { Typography, Button } from "@material-tailwind/react";
import {
  ChevronDownIcon,
  CheckIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import BranchSelector from "../../components/branchSelector";
import useTokenValidation from "../../hooks/udeTokenValidation";
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "../../utils/axios";


const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  if (!token) return null;
  try {
    return jwtDecode(token);
    const user = data
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

function StaffDashboard({ children }) {
  const decodedToken = getDecodedToken();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [userId, setUserId] = useState(decodedToken?.id);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (decodedToken?.id) {
      setUserId(decodedToken.id); // Ensure userId is set only once
    }
  }, [decodedToken?.id]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const response = await axiosInstance.get(`/getCurrentUser/${userId}`);
      const data = response.data;
      console.log(data);
      console.log(data.firstName);
      setName(data.firstName);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  useTokenValidation();

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  return (
    <PageLayout className="">
      <div className="flex justify-between items-center w-[1540px] bg-gradient-to-t from-c2 to-white text-black h-[100px]">
        <Link to="/staffDashboard/:id">
          <h1 className="ml-10 pt-5 pb-5 text-3xl font-bold font-[Montserrat]">
            {`Welcome ${name} !`}
          </h1>
        </Link>
        <Link to="/staffDashboard/:id">
          <Button className="w-[200px] h-[20px] justify-end text-c1 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 hover:text-white bg-c5 rounded-xl text-md font-[Montserrat]">
            View Reports
          </Button>
        </Link>
        <div className="mr-4">
        </div>
      </div>
      <div>
        <div className="flex bg-c2 pb-5 h-[100px] 2xl:h-[125px] ">
          <div className="pt-5 flex">
            <h2 className="ml-10 mt-1 font-bold text-c3 text-3xl font-[Montserrat]">
              Navigate to
            </h2>
            <div className="mt-5 ml-10 justify-start bg-c3 w-[600px] h-2 rounded-2xl"></div>
            <ArrowRightEndOnRectangleIcon className="mt-1 ml-5 flex h-10 w-10 bg-c5 rounded-2xl stroke border-[2px] border-c5" />
          </div>
          <div className="pt-5 pl-10 justify-end flex grid-cols-4 gap-5">
            <Link to="/trackOrdersStaff">
              <Button className="w-[250px] hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                Track Orders
              </Button>
            </Link>
            <Link to="/proInventoryStaff">
              <Button className="w-[250px] hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                Produced Inventory
              </Button>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </PageLayout>
  );
}

export default StaffDashboard;
