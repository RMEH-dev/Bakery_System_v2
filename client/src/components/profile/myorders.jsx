import React from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

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
          <Card className="-mt-[300px] mb-10 ml-[380px] justify-left w-[150px] 2xl:w-[1050px]  h-[500px] z-120 flex bg-gradient-to-bl from-white to-c4">
            {/* <Typography className="pl-12 pt-5 text-2xl text-black font-bold font-[Montserrat]">
              Log In
            </Typography>
            <Typography className="text-black mt-0 font-medium font-[Montserrat] pl-12 pt-2">
              To taste the flavors of freshness!
            </Typography> */}
            <table className=" bg-white w-[150px] 2xl:w-[1050px] min-w-max table-auto rounded-xl">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b items-center justify-center rounded-tr-xl rounded-tl-xl border-c3 bg-gradient-to-b from-c3 to-c1 p-4"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className="text-lg justify-center place-items-center font-bold leading-none opacity-90"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  ({ Product, Price, Quantity, SubTotal }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={Product}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Product}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal pl-16 justify-center items-center"
                          ></Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {SubTotal}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </CustomerProfile>
  );
}

export default MyOrders;
