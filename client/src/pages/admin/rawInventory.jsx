import React, { useState } from "react";
import AdminDashboard from "./admindashboard";
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
import RawStockTable from "../../components/rawStockTable";

function RawInventory() {
  return (
    <AdminDashboard>
      <div className="bg-c1 pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c1 pt-10 2xl:h-[1200px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[860px] 2xl:h-[1200px]  sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10  w-[1540px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  Raw Inventory
                </Typography>
                <Link to="/addRawInventory">
                  <div className="flex pr-5 pt-2  justify-end">
                   
                    <Button className=" mt-3 w-[300px] hover:bg-deep-orange-900 bg-c1 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                      Add Raw Stock
                      <PlusIcon className="text-c4 mr-4 justify-start flex absolute bg-c2 rounded-2xl font-bold mt-6 w-5 h-5" />
                    </Button>
                  </div>
                </Link>
              </div>
              <RawStockTable />
            </div>
          </Card>
        </div>
      </div>
    </AdminDashboard>
  );
}

export default RawInventory;
