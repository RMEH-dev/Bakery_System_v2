import React, { useState } from "react";
import { Cart } from "./cart";
import { Typography, Checkbox, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Cart>
      <div className="grid flex grid-cols-3 gap-20 my-10 ">
        <div className="rounded-r-2xl w-[460px] mt-7 opacity-50 bg-c5 h-[450px]">
          <img
            src="./src/assets/images/i1.jpg"
            className="rounded-r-2xl opacity-20 w-[460px] h-[450px]"
          />
        </div>
        <div className="-ml-4 rounded-2xl w-[490px]  items-center justify-between bg-c5 h-[500px]">
          <Typography className="font-extrabold font-[Montserrat] text-center mt-5 text-3xl text-c1 ">
            Payment Successful
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="items-center mt-5 ml-40 w-[150px] h-[150px] text-c1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
          <Checkbox
            className="bg-c3 w-5 h-5"
            label={
              <Typography className="mt-14 text-lg text-c1 font-[Montserrat] flex items-center font-bold">
                Receive promotional SMS & Updates
              </Typography>
            }
            containerProps={{ className: "mt-14 ml-10" }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            className="bg-c3 w-5 h-5"
            label={
              <Typography className="mt-5 text-lg text-c1 font-[Montserrat] flex items-center font-bold">
                Receive e-receipt via e-mail
              </Typography>
            }
            containerProps={{ className: "mt-5 ml-10" }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <Link to="/profileUser/MyOrders">
            <Button className="mt-6 ml-5 w-[450px] justify-items-center hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]">
              Complete order
            </Button>
          </Link>
        </div>

        <div className="rounded-l-2xl w-[460px] mt-7 opacity-50 bg-c5 h-[450px]">
          <img
            src="./src/assets/images/i3.jpg"
            className="rounded-l-2xl opacity-20  w-[460px] h-[450px]"
          />
        </div>
      </div>
    </Cart>
  );
}

export default OrderSuccess;
