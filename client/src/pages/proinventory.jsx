import React, { useState } from "react";
import AdminDashboard from "./admin/admindashboard";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ProStockTable from "../components/proStockTable";


function ProInventory() {
  return (
    <AdminDashboard>
      <div className="bg-c3 pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c3 pt-10 h-[700px] 2xl:h-[1000px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[700px] sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[1540px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  Produced Inventory
                </Typography>
                <Link to="/addProInventory">
                  <div className="flex pr-5 pt-2 justify-end">
                  <PlusIcon className="text-c4 mr-4 justify-start bg-c2 rounded-2xl font-bold mt-6 absolute w-5 h-5" />
                    <Button className="mt-3 w-[280px] -pl-10 pr-10 hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                      Add Produced Item    
                     
                    </Button>
                  </div>
                </Link>
              </div>
              <div className="gap-20 mr-10 w-[1540px] flex-cols">
                <ProStockTable />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminDashboard>
  );
}

export default ProInventory;
