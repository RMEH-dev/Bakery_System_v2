import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios"
import { ChevronDownIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

function BranchSelector2({ endpoint, selectedOption, setSelectedOption, label, disabled }) {
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/${endpoint}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data for ${label}:`, error);
      });
  }, [endpoint, label]);

  const handleSelect = (item) => {
    setSelectedOption(item);
    setIsDropdownOpen(false);
  };

  const handleUnselect = () => {
    setSelectedOption("");
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer pl-3 mt-2  items-center w-[250px] hover:bg-c1 bg-c3 py-2 rounded-2xl text-c2 font-semibold text-lg font-[Montserrat]"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption || `${label}`}
        <div className="flex items-center">
          {selectedOption && (
            <XCircleIcon 
              className="w-5 h-5 text-white mr-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); 
                handleUnselect();
              }} 
            />
          )}
          <ChevronDownIcon className=" flex absolute justify-end ml-[200px] mb-6 w-5 h-5" />
        </div>
      </div>
      {isDropdownOpen && !disabled && (
        <div className="mt-5 mr-5 absolute cursor-pointer z-10 w-[250px] font-[Montserrat] font-semibold bg-c5  text-c1 rounded-2xl shadow-lg">
          <ul className="max-h-64 overflow-y-auto">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(Object.values(item)[0])}
                className={
                  selectedOption === Object.values(item)[0]
                    ? "bg-c3 cursor-pointer text-white font-[Montserrat] font-semibold flex rounded-2xl justify-between items-center p-2"
                    : "flex justify-between items-center p-4"
                }
              >
                {Object.values(item)[0]}
                {selectedOption === Object.values(item)[0] && (
                  <CheckIcon className="w-5 h-5 text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BranchSelector2;
