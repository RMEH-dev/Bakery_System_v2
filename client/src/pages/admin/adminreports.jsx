import React, { useState } from "react";
import AdminDashboard from "./admindashboard";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
function AdminReports() {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const handleSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleSelect3 = (option) => {
    setSelectedOption3(option);
    setIsDropdownOpen3(false);
  };

  const handleSelect4 = (option) => {
    setSelectedOption4(option);
    setIsDropdownOpen4(false);
  };

  return (
    <AdminDashboard>
      <div className="bg-c5 pb-5">
        <div className="ml-5 mb-5 mr-5 bg-c5 pt-10 h-[650px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[800px] sm:w-auto bg-white rounded-2xl"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                Reports
              </Typography>
              <div className="gap-20 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Card className="mx-10 mb-10 w-[600px] h-[300px]">
                  <div className="flex-col flex">
                    <Typography className="pl-5 bg-c5 w-[600px] pt-1 rounded-2xl text-black font-bold text-lg font-[Montserrat]">
                      Monthly Report
                    </Typography>
                    <div className="ml-40 right-0 absolute">
                      <Typography
                        className="cursor-pointer ml-40 justify-center text-center w-[200px] pb-1 bg-c1 rounded-2xl text-c2 font-semibold text-lg font-[Montserrat] z-120"
                        onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                      >
                        Select Month
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                        {isDropdownOpen1 && (
                          <ul className="mt-2 absolute cursor-pointer rounded-2xl text-c3 w-[200px] text-lg font-bold font-[Montserrat] bg-c2">
                            <li
                              onClick={() => handleSelect1("January")}
                              className={
                                selectedOption1 === "January"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              January
                              {selectedOption1 === "January" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("February")}
                              className={
                                selectedOption1 === "February"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              February
                              {selectedOption1 === "February" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("March")}
                              className={
                                selectedOption1 === "March"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              March
                              {selectedOption1 === "March" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("April")}
                              className={
                                selectedOption1 === "April"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              April
                              {selectedOption1 === "April" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("May")}
                              className={
                                selectedOption1 === "May"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              May
                              {selectedOption1 === "May" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("June")}
                              className={
                                selectedOption1 === "June"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              June
                              {selectedOption1 === "June" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("July")}
                              className={
                                selectedOption1 === "July"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              July
                              {selectedOption1 === "July" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("August")}
                              className={
                                selectedOption1 === "August"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              August
                              {selectedOption1 === "August" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("September")}
                              className={
                                selectedOption1 === "September"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              September
                              {selectedOption1 === "September" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("October")}
                              className={
                                selectedOption1 === "October"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              October
                              {selectedOption1 === "October" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("November")}
                              className={
                                selectedOption1 === "November"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              November
                              {selectedOption1 === "November" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect1("December")}
                              className={
                                selectedOption1 === "December"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              December
                              {selectedOption1 === "December" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                          </ul>
                        )}
                      </Typography>
                    </div>
                  </div>
                </Card>
                <Card className="mx-10 mb-10 w-[600px]  h-[300px]">
                  <div className="gap-10 pr-10 flex-col grid-cols-2 grid">
                    <Typography className="pl-5 pr-10 bg-c5 w-[600px] pt-1 rounded-2xl text-black font-bold text-lg font-[Montserrat]">
                      Trending Products
                    </Typography>
                    <div className="ml-40 right-0 absolute">
                      <Typography
                        className="cursor-pointer ml-40 justify-center text-center w-[200px] pb-1 bg-c1 rounded-2xl text-c2 font-semibold text-lg font-[Montserrat] z-120"
                        onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                      >
                        Select Month
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                        {isDropdownOpen2 && (
                          <ul className="mt-2 absolute cursor-pointer rounded-2xl text-c3 w-[200px] text-lg font-bold font-[Montserrat] bg-c2">
                            <li
                              onClick={() => handleSelect2("January")}
                              className={
                                selectedOption2 === "January"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              January
                              {selectedOption2 === "January" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("February")}
                              className={
                                selectedOption2 === "February"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              February
                              {selectedOption2 === "February" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("March")}
                              className={
                                selectedOption2 === "March"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              March
                              {selectedOption2 === "March" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("April")}
                              className={
                                selectedOption2 === "April"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              April
                              {selectedOption2 === "April" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("May")}
                              className={
                                selectedOption2 === "May"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              May
                              {selectedOption2 === "May" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("June")}
                              className={
                                selectedOption2 === "June"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              June
                              {selectedOption2 === "June" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("July")}
                              className={
                                selectedOption2 === "July"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              July
                              {selectedOption2 === "July" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("August")}
                              className={
                                selectedOption2 === "August"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              August
                              {selectedOption2 === "August" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("September")}
                              className={
                                selectedOption2 === "September"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              September
                              {selectedOption2 === "September" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("October")}
                              className={
                                selectedOption2 === "October"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              October
                              {selectedOption2 === "October" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("November")}
                              className={
                                selectedOption2 === "November"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              November
                              {selectedOption2 === "November" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect2("December")}
                              className={
                                selectedOption2 === "December"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              December
                              {selectedOption2 === "December" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                          </ul>
                        )}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="gap-20 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Card className="mx-10 mb-10 w-[600px] h-[300px]">
                  <div className="flex-col flex">
                    <Typography className="pl-5 bg-c5 w-[600px] pt-1 rounded-2xl text-black font-bold text-lg font-[Montserrat]">
                     Staff Performance
                    </Typography>
                    <div className="ml-40 right-0 absolute">
                      <Typography
                        className="cursor-pointer ml-40 justify-center text-center w-[200px] pb-1 bg-c1 rounded-2xl text-c2 font-semibold text-lg font-[Montserrat] z-120"
                        onClick={() => setIsDropdownOpen3(!isDropdownOpen3)}
                      >
                        Select Month
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                        {isDropdownOpen3 && (
                          <ul className="mt-2 absolute cursor-pointer rounded-2xl text-c3 w-[200px] text-lg font-bold font-[Montserrat] bg-c2">
                            <li
                              onClick={() => handleSelect3("January")}
                              className={
                                selectedOption3 === "January"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              January
                              {selectedOption3 === "January" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("February")}
                              className={
                                selectedOption3 === "February"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              February
                              {selectedOption3 === "February" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("March")}
                              className={
                                selectedOption3 === "March"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              March
                              {selectedOption3 === "March" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("April")}
                              className={
                                selectedOption3 === "April"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              April
                              {selectedOption3 === "April" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("May")}
                              className={
                                selectedOption3 === "May"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              May
                              {selectedOption3 === "May" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("June")}
                              className={
                                selectedOption3 === "June"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              June
                              {selectedOption3 === "June" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("July")}
                              className={
                                selectedOption3 === "July"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              July
                              {selectedOption3 === "July" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("August")}
                              className={
                                selectedOption3 === "August"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              August
                              {selectedOption3 === "August" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("September")}
                              className={
                                selectedOption3 === "September"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              September
                              {selectedOption3 === "September" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("October")}
                              className={
                                selectedOption3 === "October"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              October
                              {selectedOption3 === "October" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("November")}
                              className={
                                selectedOption3 === "November"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              November
                              {selectedOption3 === "November" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect3("December")}
                              className={
                                selectedOption3 === "December"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              December
                              {selectedOption3 === "December" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                          </ul>
                        )}
                      </Typography>
                    </div>
                  </div>
                </Card>
                <Card className="mx-10 mb-10 w-[600px]  h-[300px]">
                  <div className="gap-10 pr-10 flex-col grid-cols-2 grid">
                    <Typography className="pl-5 pr-10 bg-c5 w-[600px] pt-1 rounded-2xl text-black font-bold text-lg font-[Montserrat]">
                      Raw Stock Amounts
                    </Typography>
                    <div className="ml-40 right-0 absolute">
                      <Typography
                        className="cursor-pointer ml-40 justify-center text-center w-[200px] pb-1 bg-c1 rounded-2xl text-c2 font-semibold text-lg font-[Montserrat] z-120"
                        onClick={() => setIsDropdownOpen4(!isDropdownOpen4)}
                      >
                        Select Month
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                        {isDropdownOpen4 && (
                          <ul className="mt-2 absolute cursor-pointer rounded-2xl text-c3 w-[200px] text-lg font-bold font-[Montserrat] bg-c2">
                            <li
                              onClick={() => handleSelect4("Ganemulla")}
                              className={
                                selectedOption4 === "Ganemulla"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              Ganemulla
                              {selectedOption4 === "Ganemulla" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect4("Kandana")}
                              className={
                                selectedOption4 === "Kandana"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              Kandana
                              {selectedOption4 === "Kandana" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                            <li
                              onClick={() => handleSelect4("Bopitiya")}
                              className={
                                selectedOption4 === "Bopitiya"
                                  ? "bg-c4 flex rounded-2xl justify-between items-center pl-5"
                                  : "flex justify-between items-center pl-5"
                              }
                            >
                              Bopitiya
                              {selectedOption4 === "Bopitiya" && (
                                <CheckIcon className="w-5 h-5 text-green-500" />
                              )}
                            </li>
                          </ul>
                        )}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminDashboard>
  );
}

export default AdminReports;
