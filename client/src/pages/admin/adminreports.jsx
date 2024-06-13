import React, { useState } from "react";
import AdminDashboard from "./admindashboard";
import ProductSales from "../../components/primary/productSales";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import ProductRevenue from "../../components/primary/productRevenue";
import BranchProductQuantities from "../../components/primary/branchPieChart";
import BranchRawMaterials from "../../components/primary/rawStockPieChart";
function AdminReports() {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const handleSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleSelect3 = (option) => {
    setSelectedOption3(option);
    setIsDropdownOpen3(false);
  };

  const handleSelect4 = (option) => {
    setSelectedOption4(option);
    setIsDropdownOpen4(false);
  };

  return (
    <AdminDashboard>
      <div className="bg-c5 pb-5  w-[1540px]">
        <div className="ml-5 mb-5 mr-5  w-[1540px] bg-c5 pt-10 h-[600px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-10  w-[1540px] h-[600px] justify-items-center sm:w-auto bg-white rounded-2xl"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex w-[1540px]  flex-col">
              <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                Reports
              </Typography>
            </div>
            <div className="mb-10 pb-10">
              <ProductSales />
            </div>
            <div className="mb-10 pb-10">
            <ProductRevenue />
            </div>
            <div className="mb-10 pb-10">
              <BranchProductQuantities/>
            </div>
            <div className="mb-10 pb-10">
            <BranchRawMaterials/>
            </div>
          </Card>
        </div>
      </div>
    </AdminDashboard>
  );
}

export default AdminReports;
