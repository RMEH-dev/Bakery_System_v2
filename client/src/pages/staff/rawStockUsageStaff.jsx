import React, { useState } from "react";
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
import StaffDashboard from "./staffDashboard";
import RawStockUsageTableStaff from "../../components/rawStockUsageTableStaff"

function RawStockUsageStaff() {
  return (
    <StaffDashboard>
      <div className="bg-white pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-white pt-10 h-[650px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[800px] sm:w-auto bg-c5 rounded-2xl z-80"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  Inventory Usage
                </Typography>
                <Link to="/addRawStockUsageStaff">
                  <div className="flex pr-5 pt-2  justify-end">
                    
                    <Button className=" mt-3 w-[280px] hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]">
                      Inventory Usage
                    </Button>
                  </div>
                </Link>
              </div>
              <RawStockUsageTableStaff />
            </div>
          </Card>
        </div>
      </div>
    </StaffDashboard>
  );
}

export default RawStockUsageStaff;
