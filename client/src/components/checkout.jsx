import React, { useState } from "react";
import { Cart } from "./cart";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Checkout() {
  const [isChecked, setIsChecked] = useState(false);
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Cart>
      <div className="z-80 mt-12 ml-[20px] h-[750px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[850px] mb-6 rounded-2xl bg-c4 text-c2 hover:text-c2 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[750px] 2xl:w-[850px] sm:w-auto bg-gradient-to-tr from-c3 to-c1 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography className="-mb-3 text-xl text-c2 font-bold font-[Montserrat]">
                Billing Address
              </Typography>
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                  First Name
                </Typography>
                <Typography className="-mb-3 -ml-12 text-c2 font-semibold font-[Montserrat]">
                  Last Name
                </Typography>
                <Input
                  type="text"
                  size="md"
                  placeholder="firstName"
                  className="-mb-3 w-[350px] 2xl:w-[300px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
                <Input
                  type="text"
                  size="md"
                  placeholder="lastName"
                  className="-mb-3 -ml-12 w-[350px] 2xl:w-[300px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>
              <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                Street Address
              </Typography>
              <div className="grid flex grid-cols-2 gap-5">
                <Input
                  type="text"
                  size="md"
                  placeholder="xxxxx/xx xxxx"
                  className="-mb-3 w-[550px] 2xl:w-[745px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>
              <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                Town / City
              </Typography>
              <Input
                type="tel"
                size="md"
                placeholder="Colombo 03"
                className="-mb-3 w-[65px] 2xl:w-[745px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />

              <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                Postcode / ZIP
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="12010"
                className="-mb-3 w-[895px] 2xl:w-[745px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
              <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                Contact No.
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="077XXXXXX"
                className="-mb-3 w-[895px] 2xl:w-[745px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
              <Typography className="-mb-3 text-c2 font-semibold font-[Montserrat]">
                Email Address
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="name@gmail.com"
                className="-mb-3 w-[895px] 2xl:w-[745px] text-c2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
              <Checkbox
                className="bg-c2 w-6 h-6"
                label={
                  <Typography className="mt-3 text-xl text-c2 font-[Montserrat] flex items-center font-bold">
                    Receive promotional SMS & Updates
                  </Typography>
                }
                containerProps={{ className: "mt-3" }}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
          </form>
        </Card>
      </div>
      <div className="z-150 -mt-[775px] mb-6  ml-[900px] h-[820px] w-[300px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[580px] rounded-2xl bg-c4 text-c3 hover:text-c1 space-y-1">
        <Card
          className="flex flex-col justify-items-center h-[820px] sm:w-auto bg-gradient-to-tr from-c4 to-white rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[25px] mt-5 mb-2 w-[300px] 2xl:w-[800px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-2 flex flex-col gap-6">
              <Typography className=" text-xl text-black font-bold font-[Montserrat]">
                Order Details
              </Typography>
              <Typography className="pl-2 bg-c5 w-[520px] rounded-2xl text-black font-bold text-lg font-[Montserrat]">
                Product
              </Typography>
              <div className="ml-1 -mt-4 bg-c3 w-[510px] h-1 rounded-2xl"></div>
              <div className="mt-3 grid flex grid-cols-2 gap-5">
                <Typography className="pl-2 w-[520px] rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Product 1
                </Typography>
                <Typography className="pl-2 w-[520px] rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Rs. 500.00
                </Typography>
                <Typography className="pl-2 w-[520px] rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Product 2
                </Typography>
                <Typography className="pl-2 w-[520px] rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Rs. 1000.00
                </Typography>
              </div>
              <div className="mt-3 grid flex grid-cols-2 gap-5">
                <Typography className="mb-3 pl-2 w-[520px] bg-c5 rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Sub Total
                </Typography>
                <Typography className="mb-3  text-black font-semibold text-lg font-[Montserrat]">
                  Rs. 1500.00
                </Typography>
              </div>
              <div className="-mt-2 grid inline-block flex grid-cols-2 gap-5">
                <Typography
                  className={`mb-3 cursor-pointer pl-2 w-[520px] bg-c5 rounded-2xl text-black font-semibold text-lg font-[Montserrat] `}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Pickup Outlet
                  <ChevronDownIcon className="ml-36 -mt-6 w-5 h-5" />
                  {isDropdownOpen && (
                    <ul className="mt-3 mb-3 cursor-pointer rounded-2xl text-c3 w-[300px] text-lg font-bold font-[Montserrat] bg-c2">
                      <li
                        onClick={() => handleSelect("Ganemulla")}
                        className={
                          selectedOption === "Ganemulla"
                            ? "bg-c4 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Ganemulla
                        {selectedOption === "Ganemulla" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                      <li
                        onClick={() => handleSelect("Kandana")}
                        className={
                          selectedOption === "Kandana"
                            ? "bg-c4 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Kandana
                        {selectedOption === "Kandana" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                      <li
                        onClick={() => handleSelect("Bopitiya")}
                        className={
                          selectedOption === "Bopitiya"
                            ? "bg-c4 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Bopitiya
                        {selectedOption === "Bopitiya" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                    </ul>
                  )}
                </Typography>
              </div>

              <Typography className=" pl-2 w-[520px] bg-c5 rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                Discount Code
              </Typography>
              <Input
                className="h-5 ml-1 mt-1 w-[180px] text-c1 font-semibold text-md font-[Montserrat]"
                type="currency"
                placeholder="Enter Discount Code"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="mb-3 pl-2 w-[520px] bg-c5 rounded-2xl text-black font-semibold text-lg font-[Montserrat]">
                  Total
                </Typography>
                <Typography className="mb-3  text-black font-semibold text-lg font-[Montserrat]">
                  Rs. 1250.00
                </Typography>
              </div>

              <div className="-mt-2 grid inline-block flex grid-cols-2 gap-5">
                <Typography
                  className={` cursor-pointer pl-2 w-[520px] bg-c5 rounded-2xl text-black font-semibold text-lg font-[Montserrat] `}
                  onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                >
                  Payment Option
                  <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                  {isDropdownOpen2 && (
                    <ul className="mt-3 mb-3 cursor-pointer rounded-2xl text-c3 w-[500px] text-lg font-bold font-[Montserrat] bg-c2">
                      <li
                        onClick={() => handleSelect2("Cash Payment")}
                        className={
                          selectedOption2 === "Cash Payment"
                            ? "bg-c4 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Cash Payment
                        {selectedOption2 === "Cash Payment" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                      <li
                        onClick={() => handleSelect2("Card Payment")}
                        className={
                          selectedOption2 === "Card Payment"
                            ? "bg-c4 flex rounded-2xl justify-between items-center p-4"
                            : "flex justify-between items-center p-4"
                        }
                      >
                        Card Payment
                        {selectedOption2 === "Card Payment" && (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        )}
                      </li>
                    </ul>
                  )}
                </Typography>
              </div>
            </div>
            <Link to="/orderSuccess">
            <Button className="mt-4 w-[520px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]">
              Pay Total
            </Button>
            </Link>
          </form>
        </Card>
      </div>
    </Cart>
  );
}
