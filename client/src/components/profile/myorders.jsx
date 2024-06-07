import React from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import UserOrdersTable from "../userOrdersTable";
import QuantityBtn from "./../quantitybtn";

const TABLE_HEAD = ["Order Details", "Date", "Total Amount", "Status"];

const TABLE_ROWS = [
  {
    Order_Details: "",
    Date: "",
    Total_Amount: "",
    Status: "",
  },
];

function MyOrders() {
  return (
    <CustomerProfile>
      <div className="mb-1 flex flex-col gap-6">
        <div className="grid flex grid-cols-2 gap-5">
          <Card className="-mt-[300px] mb-10 ml-[380px] justify-left w-[150px] 2xl:w-[1050px] z-120 flex bg-gradient-to-bl from-white to-c4">
            <UserOrdersTable/>
          </Card>
        </div>
      </div>
    </CustomerProfile>
  );
}

export default MyOrders;
