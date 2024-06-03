import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/pagelayout";
import { Typography, Button } from "@material-tailwind/react";
import {
  ChevronDownIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import BranchSelector from "../../components/branchSelector";

function AdminDashboard({ children }) {
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <PageLayout className="">
      <div className="flex justify-between items-center bg-gradient-to-b from-c1 to-c3 text-white w-[800px] h-[100px]">
        <Link to="/adminDashboard">
          <h1 className="ml-10 pt-5 pb-5 text-4xl font-bold font-[Montserrat]">
            Welcome Mr. Perera
          </h1>
        </Link>
        <div className="ml-20 flex flex-cols-3 justify-end right-0">
          <Link to="/adminDashboard">
            <Button className="w-[200px] justify-end h-[20px] hover:transition-transform duration-500 ease-in-out hover:scale-105 text-c1 hover:bg-deep-orange-900 hover:text-white bg-white rounded-xl text-md font-[Montserrat]">
              View Reports
            </Button>
          </Link>
          <div className="bg-white h-12 w-3 ml-5 mr-5  rounded-2xl z-10"></div>
          <Link to="/inventoryLogs">
            <Button className="w-[200px] h-[20px] text-c1 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 hover:text-white bg-white rounded-xl text-md font-[Montserrat]">
              View Logs
            </Button>
          </Link>
        </div>
        <div className="ml-20 mt-5 flex justify-right">
        </div>
      </div>
      <div>
        <div className="flex bg-white pb-5 h-[100px] 2xl:h-[125px] ">
          <div className="pt-5 flex">
            <h2 className="ml-10 mt-1 font-bold text-c3 text-3xl font-[Montserrat]">
              Navigate
            </h2>

            <div className="mt-5 ml-10 justify-start bg-c3 w-[150px] h-2 rounded-2xl"></div>
            <ArrowRightEndOnRectangleIcon className="mt-1 ml-10 flex h-10 w-10 stroke-c3 bg-c5 rounded-2xl stroke border-[2px] border-c3 text-c3" />
          </div>
          <div className="pt-5 pl-10 justify-end flex grid-cols-4 gap-5">
            <Link to="/proInventory">
              <Button className="w-[250px] hover:duration-400 hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                Produced Inventory
              </Button>
            </Link>
            <Link to="/rawInventory">
              <Button className="w-[250px] hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                Raw Inventory
              </Button>
            </Link>
            <Link to="/users">
              <Button className="w-[250px] hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                system users
              </Button>
            </Link>
            <Link to="/trackOrdersAdmin">
              <Button className="w-[200px] hover:transition-transform duration-500 ease-in-out hover:scale-105 justify-end hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                Track Orders
              </Button>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </PageLayout>
  );
}

export default AdminDashboard;
