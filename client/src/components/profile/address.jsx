import React from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import ShippingAddress from "./shippingaddress";
import BillingAddress from "./billingaddress";

import { Link } from "react-router-dom";

function Address() {
  return (
    <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[300px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[300px] sm:w-auto bg-gradient-to-bl from-white to-c4 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                  Billing Address
                </Typography>
                <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                  Shipping Address
                </Typography>
                <Link to="/profileUser/Addresses/BillingAddress">
                  <Button className="mt-2 w-[100px] items-center justify-between hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                    Add
                  </Button>
                </Link>
                <Link to="/profileUser/Addresses/ShippingAddress">
                <Button className="mt-2 w-[100px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                  Add
                </Button>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </CustomerProfile>
  );
}

export default Address;
