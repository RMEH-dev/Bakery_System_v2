import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios"
import { ChevronDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";

function DropdownWithAdd({ endpoint, selectedOption, setSelectedOption, label, disabled }) {
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState("");

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

  const handleAddNewItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { name: newItem }]); // Assuming the item has a `name` property
      setSelectedOption(newItem);
      setNewItem("");
      setIsDropdownOpen(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const value = Object.values(item)[0];
    return value !== null && value.toLowerCase().includes(searchTerm.toLowerCase());
  });
  

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
          <div className="p-2 bg-white border-t-2 border-gray-300">
            <input
              type="text"
              placeholder={`Add new ${label}`}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="w-full p-2 text-lg font-[Montserrat] border-b-2 border-gray-300"
            />
            <button
              onClick={handleAddNewItem}
              className="mt-2 w-full bg-deep-orange-800 text-white py-2 rounded-lg"
            >
              Add {label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownWithAdd;
