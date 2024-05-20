import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

function Dropdown({ endpoint, selectedOption, setSelectedOption, label, disabled }) {
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/routes/${endpoint}`)
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

  const filteredItems = items.filter((item) =>
    Object.values(item)[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[200px] bg-deep-orange-800 py-2 rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption || `${label}`}
        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
      </div>
      {isDropdownOpen && !disabled && (
        <div className="mt-5 mr-5 absolute z-10 w-[250px] font-[Montserrat] bg-c5 rounded-2xl shadow-lg">
          <input
            type="text"
            placeholder={`Search ${label}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-t-2xl text-lg font-[Montserrat] bg-white border-b-2 border-gray-300"
          />
          <ul className="max-h-64 overflow-y-auto">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(Object.values(item)[0])}
                className={
                  selectedOption === Object.values(item)[0]
                    ? "bg-deep-orange-800 text-white font-[Montserrat] flex rounded-2xl justify-between items-center p-2"
                    : "flex justify-between items-center p-4"
                }
              >
                {Object.values(item)[0]}
                {selectedOption === Object.values(item)[0] && (
                  <CheckIcon className="w-5 h-5 text-green-500" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
