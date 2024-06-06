import React, { useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

function Dropdown3({ selectedOption, setSelectedOption, label, disabled }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const items = ["In Use", "All Used", "Remaining", "To Be Used"];

  const handleSelect = (item) => {
    setSelectedOption(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[300px] hover:bg-c3 bg-deep-orange-800 py-2 rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption || `${label}`}
        <ChevronDownIcon className="flex absolute justify-end ml-[260px] mb-6 w-5 h-5" />
      </div>
      {isDropdownOpen && !disabled && (
        <div className="mt-5 mr-5 absolute z-10 w-[300px] font-[Montserrat] text-c1 font-semibold bg-c5 rounded-2xl shadow-lg">
          <ul className="max-h-64 cursor-pointer overflow-y-auto">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className={
                  selectedOption === item
                    ? "bg-deep-orange-800 text-white font-[Montserrat] flex rounded-2xl justify-between items-center p-2"
                    : "flex justify-between items-center p-4"
                }
              >
                {item}
                {selectedOption === item && (
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

export default Dropdown3;
