import React, { Fragment, useState } from "react";
import { Cart } from "./cart";
import { FooterWithSocialLinks } from "./footer";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import QuantityBtn from "./quantitybtn";

const TABLE_HEAD = ["Product", "Price", "Quantity", "SubTotal"];

const TABLE_ROWS = [
  {
    Product: "",
    Price: "",
    Quantity: "",
    SubTotal: "",
  },
];

export function ShoppingCart() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const products = [1, 2, 3, 4];
  return (
    <div>
      <Cart>
      <div className=" bg-white w-[600px] h-[1000px] pb-36 lg:w-auto md:w-auto sm:w-auto sm:h-auto sm:text-wrap sm:text-md">
        
        <Card className="mt-20 ml-20 justify-left w-[150px] lg:w-[750px]  h-[500px] z-120 flex bg-c4">
          {/* <Typography className="pl-12 pt-5 text-2xl text-black font-bold font-[Montserrat]">
              Log In
            </Typography>
            <Typography className="text-black mt-0 font-medium font-[Montserrat] pl-12 pt-2">
              To taste the flavors of freshness!
            </Typography> */}
          <table className=" bg-c2 w-[150px] lg:w-[750px] min-w-max table-auto rounded-xl">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b items-center justify-center rounded-tr-xl rounded-tl-xl border-c3 bg-c3 p-4"
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
                        >
                          <QuantityBtn />
                        </Typography>
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
      <div className="z-100 -mt-[650px] ml-[850px] h-[750px] w-[300px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[650px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col justify-items-center h-[750px] sm:w-auto bg-gradient-to-bl from-c5 to-c2 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[300px] 2xl:w-[800px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-2 flex flex-col gap-6">
              <Typography className="-mb-3 text-xl text-black font-bold font-[Montserrat]">
                Cart Details
              </Typography>
              <div className="mt-3 grid flex grid-cols-2 gap-5">
                <Typography className="mb-3 pl-2 w-[520px] bg-c4 rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Sub Total
                </Typography>
                <Typography className="mb-3  text-black font-semibold text-lg font-[Montserrat]">
                  Rs.5500.00
                </Typography>
              </div>
              <div className="-mt-2 grid inline-block flex grid-cols-2 gap-5">
                <Typography
                  className={`mb-3 pt-2 cursor-pointer pl-2 w-[520px] bg-c4 rounded-2xl text-black font-semibold text-lg font-[Montserrat] `}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Pickup or Delivery
                  <ChevronDownIcon className="ml-44 -mt-6 w-5 h-5" />
                  {isDropdownOpen && (
                    <ul className="mt-3 mb-3 cursor-pointer rounded-2xl text-c3 w-[300px] text-lg font-bold font-[Montserrat] bg-c2">
                      <li
                        onClick={() => handleSelect("Pickup")}
                        className={
                          selectedOption === "Pickup"
                            ? "bg-c5 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Pickup
                        {selectedOption === "Pickup" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                      <li
                        onClick={() => handleSelect("Delivery")}
                        className={
                          selectedOption === "Delivery"
                            ? "bg-c5 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Delivery
                        {selectedOption === "Delivery" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                    </ul>
                  )}
                </Typography>
              </div>
              <div className="-mt-2 grid flex grid-cols-2 gap-5">
                <Typography className="mb-3 pl-2 w-[520px] bg-c4 rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Total
                </Typography>
                <Typography className="mb-3  text-black font-semibold text-lg font-[Montserrat]">
                  Rs.5500.00
                </Typography>
              </div>
              <div className="-mt-2 grid inline-block flex grid-cols-2 gap-5">
                <Typography
                  className={`mb-3 pt-2 cursor-pointer pl-2 w-[520px] bg-c4 rounded-2xl text-black font-semibold text-lg font-[Montserrat] `}
                  onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                >
                  Discount Type
                  <ChevronDownIcon className="ml-36 -mt-6 w-5 h-5" />
                  {isDropdownOpen2 && (
                    <ul className="mt-3 mb-3 cursor-pointer rounded-2xl text-c3 w-[500px] text-lg font-bold font-[Montserrat] bg-c2">
                      <li
                        onClick={() => handleSelect2("Coupon: Enter Coupon at the Checkout")}
                        className={
                          selectedOption2 === "Coupon: Enter Coupon at the Checkout"
                            ? "bg-c5 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Coupon: Enter Coupon at the Checkout 
                        {selectedOption2 === "Coupon: Enter Coupon at the Checkout" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                      <li
                        onClick={() => handleSelect2("Special Discount: Specify at the Checkout")}
                        className={
                          selectedOption2 === "Special Discount: Specify at the Checkout"
                            ? "bg-c5 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Special Discount: Specify at the Checkout
                        {selectedOption2 === "Special Discount: Specify at the Checkout" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                    </ul>
                  )}
                </Typography>
              </div>
            </div>
            <Link to="/checkout">
            <Button className="mt-4 w-[520px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]">
              Proceed to Checkout
            </Button>
            </Link>
          </form>
        </Card>
      </div>
      </Cart>
    </div>
  );
}
