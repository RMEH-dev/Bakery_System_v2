import React from "react";
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

function StaffDashboard({ children }) {
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  return (
    <PageLayout className="">
      <div className="flex justify-between items-center bg-gradient-to-b from-c1 to-c3 text-c2 w-[800px] h-[100px]">
        <Link to="/staffDashboard">
          <h1 className="ml-10 pt-5 pb-5 text-4xl font-bold font-[Montserrat]">
            Welcome Staff Member
          </h1>
        </Link>
        <Link to="/staffDashboard">
          <Button className="w-[200px] h-[20px] text-c1 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 hover:text-white bg-white rounded-xl text-md font-[Montserrat]">
            View Reports
          </Button>
        </Link>
        <div className="mr-4">
          <BranchSelector/>
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
            <Link to="/rawStockUsageStaff">
              <Button className="w-[250px] hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                Inventory Usage
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
