import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminDashboard from "./admindashboard";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios
import Dropdown from "../../components/dropdown";
import DropdownWithAdd from "../../components/dropdownwithadd";
import axiosInstance from "../../utils/axios";
import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  return jwtDecode(token);
};

function AddRawInventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProStockName, setSelectedProStockName] = useState("");
  const [selectedProStockID, setSelectedProStockID] = useState("");
  const [selectedRawStockName, setSelectedRawStockName] = useState("");
  const [RawStockName, setRawStockName] = useState("");
  const [selectedRawStockCategory, setSelectedRawStockCategory] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedUnits, setSelectedUnits] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userBranch, setUserBranch] = useState();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [isDropdownOpen1, setIsDropdownOpen1] = useState("");
  const [isDropdownOpen3, setIsDropdownOpen3] = useState("");
  const [proStockIDs, setProStockIDs] = useState([]);

  const [formData, setFormData] = useState({
    manufactureDate: "",
    expirationDate: "",
    quantity: "",
    branchID: "",
  });

  useEffect(() => {
    const user = getDecodedToken(); // Decode JWT to get user data
    setUserRole(user.userType);
    setUserBranch(user.branchID);

    if (id) {
      axiosInstance
        .get(`/getEditRawStock/${id}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          setFormData({
            manufactureDate: data.manuDate,
            expirationDate: data.expDate,
            quantity: data.quantity,
          });
          setSelectedProStockName(data.proStockName);
          setSelectedProStockID(data.proStockID);
          setSelectedRawStockName(data.rawStockName);
          setSelectedRawStockCategory(data.category);
          setSelectedSupplier(data.supplierName);
          setSelectedUnits(data.units);
          setSelectedBranch(data.branchID);
        })
        .catch((error) => {
          console.error("Error fetching raw stock data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (selectedProStockName) {
      axiosInstance
        .get(`/getProStockIDs`, {
          params: { proStockName: selectedProStockName },
        })
        .then((response) => {
          setProStockIDs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching produced stock IDs:", error);
        });
    }
  }, [selectedProStockName]);

  useEffect(() => {
    axiosInstance
      .get("/getRawStockNames")
      .then((response) => {
        setRawStockName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching raw stock names:", error);
        toast.error("Error fetching raw stock names");
      });
  }, [selectedRawStockName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData ||
      !selectedProStockName ||
      !selectedProStockID ||
      !selectedRawStockName ||
      !selectedRawStockCategory ||
      !selectedSupplier ||
      !selectedUnits
    ) {
      toast.error("Please fill out all the fields.");
      return;
    }

    // Include the selected category in the formData
    const dataToSend = {
      ...formData,
      proStockName: selectedProStockName,
      proStockID: selectedProStockID,
      rawStockName: selectedRawStockName,
      category: selectedRawStockCategory,
      supplierName: selectedSupplier,
      units: selectedUnits,
      branchID: userBranch,
    };

    console.log("Data to send to the backend:", dataToSend);

    const request = id
      ? axiosInstance.put(`/updateRawStock/${id}`, dataToSend)
      : axiosInstance.post("/addRawStock", dataToSend);

    request
      .then((response) => {
        console.log(
          id
            ? "Produced stock updated successfully"
            : "Produced Stock added successfully",
          response.data
        );
        toast.success(
          id ? "Raw Stock updated successfully" : "Raw Stock added successfully"
        );
        // Reset form fields if needed
        setFormData({
          manufactureDate: "",
          expirationDate: "",
          quantity: "",
        });
        setSelectedProStockName(null);
        setSelectedProStockID(null);
        setSelectedRawStockName(null);
        setSelectedRawStockCategory(null);
        setSelectedSupplier(null);
        setSelectedBranch(null);
        setSelectedUnits(null);
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
        toast.error("Error sending data to the Server");
      });
  };

  return (
    <AdminDashboard>
      <div className="bg-c5 pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c5 pt-10 h-[100px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[100px] sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={true}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  {id ? "Edit Raw Inventory" : "Add Raw Inventory"}
                </Typography>
              </div>
              <Card
                className="flex flex-col mb-10 ml-10 h-[900px] mr-[50px] bg-white  rounded-2xl z-80"
                shadow={false}
              >
                <form className="ml-20 mt-12 mb-2 w-[800px] 2xl:w-[1150px] sm:w-96">
                  <div className="mb-1 flex flex-col gap-y-8">
                    <Typography className="text-c1 text-xl font-bold font-[Montserrat] mb-2">
                      Select Product Name
                    </Typography>
                    <Dropdown
                      endpoint="getProStockNames"
                      selectedOption={selectedProStockName}
                      setSelectedOption={setSelectedProStockName}
                      label="Pro Name"
                    />
                    <Typography className="text-c1 mt-5 rounded-2xl bg-c2 font-semibold font-[Montserrat] pl-2 mb-2">
                      Selected Product Name is: {selectedProStockName}
                    </Typography>
                    <Typography className="text-c1 mt-5 font-semibold font-[Montserrat] mb-2">
                      Select Product StockID
                    </Typography>
                    <div>
                      <div
                        className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[200px] bg-deep-orange-800 py-2 justify-center rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                        onClick={() => setIsDropdownOpen3(!isDropdownOpen3)}
                      >
                        {selectedProStockID || "Select Pro ID"}
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                      </div>
                      {isDropdownOpen3 && (
                        <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                          {proStockIDs.map((option) => (
                            <li
                              key={option.proStockID}
                              onClick={() => {
                                setSelectedProStockID(option.proStockID);
                                setIsDropdownOpen3(false);
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
                    <Typography className="text-c1 mt-5 rounded-2xl bg-c2 font-semibold font-[Montserrat] pl-2 mb-2">
                      Selected Product ID is: {selectedProStockID}
                    </Typography>

                    <div className="mt-5 grid grid-cols-3 gap-10 mb-6">
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Raw Stock Name
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Manufacture Date
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Expiration Date
                      </Typography>
                      <DropdownWithAdd
                        endpoint="getRawStockNames"
                        selectedOption={selectedRawStockName}
                        setSelectedOption={setSelectedRawStockName}
                        label="Raw Stock Name"
                        // disabled={!!id}
                      />
                      <Input
                        type="date"
                        size="md"
                        name="manufactureDate"
                        value={formData.manufactureDate}
                        onChange={handleChange}
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <Input
                        type="date"
                        size="md"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Raw Stock Category
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Quantity
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Supplier
                      </Typography>
                      <DropdownWithAdd
                        endpoint="getRawStockCategory"
                        selectedOption={selectedRawStockCategory}
                        setSelectedOption={setSelectedRawStockCategory}
                        label="Raw Stock Category"
                        disabled={!!id}
                      />
                      <Input
                        type="number"
                        size="md"
                        name="quantity"
                        value={formData.quantity}
                        min="1"
                        step="1"
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <DropdownWithAdd
                        endpoint="getSupplier"
                        selectedOption={selectedSupplier}
                        setSelectedOption={setSelectedSupplier}
                        label="Supplier Name"
                        // disabled={!!id}
                      />
                    </div>
                  </div>
                </form>
                <Typography className="text-c1 ml-20 mt-5 mb-2 right-0 justify-end font-semibold font-[Montserrat]">
                  Units of Quantity
                </Typography>
                <div className="ml-20">
                  <DropdownWithAdd
                    endpoint="getUnits"
                    selectedOption={selectedUnits}
                    setSelectedOption={setSelectedUnits}
                    label="Units"
                    // disabled={!!id}
                  />
                </div>
                <div className="flex justify-end w-[800px] 2xl:w-[1150px]">
                  <Link to="/addRawInventory">
                    <Button
                      onClick={handleSubmit}
                      className="mt-6 items-center hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]"
                    >
                      {id ? "Update" : "Save Changes"}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </AdminDashboard>
  );
}

export default AddRawInventory;
