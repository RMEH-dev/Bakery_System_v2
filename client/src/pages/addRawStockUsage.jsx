import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import AdminDashboard from "./admin/admindashboard";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios

function AddRawStockUsage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRawStockName, setSelectedRawStockName] = useState("");
  const [selectedRawStockNames, setSelectedRawStockNames] = useState([]);
  const [selectedRawStockID, setSelectedRawStockID] = useState("");
  const [selectedRawStockIDs, setSelectedRawStockIDs] = useState([]);
  const [selectedProStockName, setSelectedProStockName] = useState("");
  const [selectedProStockNames, setSelectedProStockNames] = useState("");
  const [selectedProStockID, setSelectedProStockID] = useState("");
  const [selectedProStockIDs, setSelectedProStockIDs] = useState([]);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState("");

  const [formData, setFormData] = useState({
    thresholdQuantity: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/routes/editRawStockUsage/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            thresholdQuantity: data.thresholdQuantity,
          });
          setSelectedRawStockID(data.rawStockID);
          setSelectedProStockID(data.proStockID);
          setSelectedProStockName(data.proStockName);
          setSelectedRawStockName(data.rawStockName);
        })
        .catch((error) => {
          console.error("Error fetching raw stock usage data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (selectedRawStockName) {
      axios
        .get(`http://localhost:5000/api/routes/getRawStockIDUsage`, {
          params: { rawStockName: selectedRawStockName },
        })
        .then((response) => {
          setSelectedRawStockIDs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching raw stock IDs:", error);
        });
    }
  }, [selectedRawStockName]);

  useEffect(() => {
    if (selectedProStockName) {
      axios
        .get(`http://localhost:5000/api/routes/getProStockIDUsage`, {
          params: { proStockName: selectedProStockName },
        })
        .then((response) => {
          setSelectedProStockIDs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching produced stock IDs:", error);
        });
    }
  }, [selectedProStockName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedRawStockIDs ||
      !selectedProStockIDs ||
      !formData
    ) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const dataToSend = {
      ...formData,
      rawStockName: selectedRawStockName,
      rawStockID: selectedRawStockIDs,
      proStockName: selectedProStockName,
      proStockID: selectedProStockIDs,
    };

    const dataToSend2 = {
      ...formData,
      rawStockID: selectedRawStockIDs,
      proStockID: selectedProStockIDs,
    };
    const request = id
      ? axios.put(
          `http://localhost:5000/api/routes/updateRawStockUsage/${id}`,
          dataToSend2
        )
      : axios.post(
          "http://localhost:5000/api/routes/addRawStockUsage",
          dataToSend
        );

    request
      .then((response) => {
        toast.success(
          id
            ? "Raw Stock Usage updated successfully"
            : "Raw Stock Usage added successfully"
        );
        setFormData({
          thresholdQuantity: "",
        });
        setSelectedRawStockName(null);
        setSelectedRawStockID(null);
        setSelectedProStockName(null);
        setSelectedProStockID(null);
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });
  };

  return (
    <AdminDashboard>
      <div className="bg-c5 pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c5 pt-10 h-[50px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[50px] sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={true}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  {id ? "Edit Inventory Usage" : "Add Inventory Usage"}
                </Typography>
              </div>
              <Card
                className="flex flex-col mb-10 ml-10 h-[450px] mr-[50px] bg-white  rounded-2xl z-80"
                shadow={false}
              >
                <form className="ml-20 mt-12 mb-2 w-[800px] 2xl:w-[1150px] sm:w-96">
                  <div className="mb-1 flex flex-col gap-y-8">
                    <div className="grid grid-cols-3 gap-10 mb-6">
                    <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Produced Stock Name
                      </Typography>
                      
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Produced Stock ID
                      </Typography>
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Raw Stock Name
                      </Typography>
                      <Dropdown
                        endpoint="getProStockNameUsage"
                        selectedOption={selectedProStockName}
                        setSelectedOption={setSelectedProStockName}
                        label="Pro Stock Name"
                        disabled={!!id}
                      />
                     
                      <div>
                        <div
                          className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[200px] bg-deep-orange-800 py-2 justify-center rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                          onClick={() => !id && setIsDropdownOpen2(!isDropdownOpen2)}
                        >
                          {selectedProStockID || "Pro Stock ID"}
                        </div>
                        {isDropdownOpen2 && (
                          <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                            {selectedProStockIDs.map((option) => (
                              <li
                                key={option.proStockID}
                                onClick={() => {
                                  setSelectedProStockID(option.proStockID);
                                  setIsDropdownOpen2(false);
                                }}
                                className={
                                  selectedProStockID === option.proStockID
                                    ? "bg-deep-orange-800 text-c2 flex rounded-2xl justify-between items-center p-2"
                                    : "flex justify-between items-center p-4"
                                }
                              >
                                {option.proStockID}
                                {selectedProStockID === option.proStockID && (
                                  <CheckIcon className="w-5 h-5 text-green-500" />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <Dropdown
                        endpoint="getRawStockNameUsage"
                        selectedOption={selectedRawStockName}
                        setSelectedOption={setSelectedRawStockName}
                        label="Raw Stock Name"
                        disabled={!!id}
                      />
                     
                    </div>
                    <div className="grid grid-cols-2 w-[600px] gap-10 mb-6">
                    <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Raw Stock ID
                      </Typography>
                      <Typography className="text-c1 ml-20 pl-2 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Threshold Quantity
                      </Typography>
                      <div>
                        <div
                          className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[200px] bg-deep-orange-800 py-2 justify-center rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                          onClick={() => !id && setIsDropdownOpen1(!isDropdownOpen1)}
                        >
                          {selectedRawStockID || "Raw Stock ID"}
                        </div>
                        {isDropdownOpen1 && (
                          <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                            {selectedRawStockIDs.map((option) => (
                              <li
                                key={option.rawStockID}
                                onClick={() => {
                                  setSelectedRawStockID(option.rawStockID);
                                  setIsDropdownOpen1(false);
                                }}
                                className={
                                  selectedRawStockID === option.rawStockID
                                    ? "bg-deep-orange-800 text-c2 flex rounded-2xl justify-between items-center p-2"
                                    : "flex justify-between items-center p-4"
                                }
                              >
                                {option.rawStockID}
                                {selectedRawStockID === option.rawStockID && (
                                  <CheckIcon className="w-5 h-5 text-green-500" />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <Input
                        type="number"
                        size="md"
                        name="thresholdQuantity"
                        value={formData.thresholdQuantity}
                        onChange={handleChange}
                        min={1}
                        placeholder="thresholdQuantity"
                        className=" text-c1 ml-20 pl-5 mt-2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                    <div className="w-[700px] flex justify-end">
                      <Link to="/addRawStockUsage">
                        <Button
                          onClick={handleSubmit}
                          className="items-center hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]"
                        >
                          {id ? "Update" : "Save Changes"}
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-10"></div>
                  </div>
                </form>
              </Card>
            </div>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </AdminDashboard>
  );
}

export default AddRawStockUsage;
