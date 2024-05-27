import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function QuantityBtn({ minValue = 1, maxValue = 100, onChange }) {
  const [quantity, setQuantity] = useState(count || minValue);


  useEffect(() => {
    setQuantity(count);
  }, [count]);

  //function to handle increment
  const handleIncrementCounter = () => {
  if (quantity < maxValue) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  //function to handle decrement
  const handleDecrementCounter = () => {
    if (quantity > minValue) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
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
      <Typography>{quantity}</Typography>
      <button
        className="justify-center items-center flex w-8 h-8 rounded-r-xl ml-2 bg-white hover:bg-deep-orange-900 hover:text-white duration-500 text-deep-orange-900"
        onClick={handleIncrementCounter}
      >
        <span className="text-extrabold text-2xl">+</span>
      </button>
    </div>
  );
}
