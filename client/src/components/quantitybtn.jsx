import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

export default function QuantityBtn({ minValue = 1, maxValue = 100 }) {
  const [count, setCount] = useState(minValue);

  //function to handle increment
  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
  };

  //function to handle decrement
  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
  };

  return (
    <div className="flex-rows flex ml-10 bg-white w-[80px] rounded-xl outline-deep-orange-800 outline outline-0 shadow-md shadow shadow-deep-orange-900 items-center justify-center ">
      <button
        className="justify-center items-center flex w-8 h-8 rounded-l-xl mr-2 bg-white hover:bg-deep-orange-900 hover:text-white duration-500 text-deep-orange-900"
        onClick={handleDecrementCounter}
      >
        <span className="text-extrabold text-2xl ">-</span>
      </button>
      <Typography>{count}</Typography>
      <button
        className="justify-center items-center flex w-8 h-8 rounded-r-xl ml-2 bg-white hover:bg-deep-orange-900 hover:text-white duration-500 text-deep-orange-900"
        onClick={handleIncrementCounter}
      >
        <span className="text-extrabold text-2xl">+</span>
      </button>
    </div>
  );
}
