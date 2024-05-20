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

const categoryMap = {
  Flour: ["kg", "g", "mg", "L", "ml", "No Units"],
  Oils: ["kg", "g", "mg", "L", "ml", "No Units"],
  "Frozen Stock": ["kg", "g", "mg", "L", "ml", "No Units"],
  "Spices & Flavors": ["kg", "g", "mg", "L", "ml", "No Units"],
  Additives: ["kg", "g", "mg", "L", "ml", "No Units"],
  Other: ["kg", "g", "mg", "L", "ml", "No Units"],
};

function AddRawInventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProStock, setSelectedProStock] = useState("");
  const [selectedProStockID, setSelectedProStockID] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [isDropdownOpen1, setIsDropdownOpen1] = useState("");
  const [isDropdownOpen3, setIsDropdownOpen3] = useState("");

  const [proStockIDs, setProStockIDs] = useState([]);

  const [formData, setFormData] = useState({
    rawStockName: "",
    manufactureDate: "",
    expirationDate: "",
    quantity: "",
    supplier: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/routes/getEditRawStock/${id}`)
        .then((response) => {
          const data = response.data;

          setFormData({
            rawStockName: data.rawStockName,
            manufactureDate: data.rawManuDate,
            expirationDate: data.rawExpDate,
            quantity: data.rawStockQuantity,
            supplier: data.supplier,
          });
          setSelectedOption1(data.category);
          setSelectedOption2(data.packageAmount);
          setSelectedProStockID(data.proStockID);
        })
        .catch((error) => {
          console.error("Error fetching raw stock data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (selectedProStock) {
      axios
        .get(`http://localhost:5000/api/routes/getProStockIDs`, {
          params: { proStockName: selectedProStock },
        })
        .then((response) => {
          setProStockIDs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching produced stock IDs:", error);
        });
    }
  }, [selectedProStock]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData ||
      !selectedOption1 ||
      !selectedOption2 ||
      !selectedProStockID
    ) {
      toast.error("Please fill out all the fields.");
      return;
    }

    // Include the selected category in the formData
    const dataToSend = {
      ...formData,
      category: selectedOption1,
      packageAmount: selectedOption2,
      proStockName: selectedProStock,
      proStockID: selectedProStockID,
    };

    const request = id
      ? axios.put(
          `http://localhost:5000/api/routes/updateRawStock/${id}`,
          dataToSend
        )
      : axios.post("http://localhost:5000/api/routes/addRawStock", dataToSend);

    request
      .then((response) => {
        toast.success(
          id ? "Raw Stock updated successfully" : "Raw Stock added successfully"
        );
        // Reset form fields if needed
        setFormData({
          rawStockName: "",
          manufactureDate: "",
          expirationDate: "",
          quantity: "",
          supplier: "",
        });
        setSelectedOption1(null);
        setSelectedOption2(null);
        setSelectedProStock(null);
        setSelectedProStockID(null);
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
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
                      selectedOption={selectedProStock}
                      setSelectedOption={setSelectedProStock}
                      label="Pro Name"
                    />
                    <Typography className="text-c1 mt-5 rounded-2xl bg-c2 font-semibold font-[Montserrat] pl-2 mb-2">
                      Selected Product Name is: {selectedProStock}
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
                      <Input
                        type="text"
                        size="md"
                        placeholder="Raw Stock Name"
                        name="rawStockName"
                        value={formData.rawStockName}
                        onChange={handleChange}
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
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
                      <Typography
                        className="cursor-pointer pl-2 mt-2 pt-0.5 items-center w-[200px] bg-deep-orange-800 py-2 justify-center rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                        onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                      >
                        {selectedOption1 || "Select Category"}
                        <ChevronDownIcon className="ml-40 -mt-6 w-5 h-5" />
                        {isDropdownOpen1 && (
                          <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                            {Object.keys(categoryMap).map((category) => (
                              <li
                                key={category}
                                onClick={() => handleSelect1(category)}
                                className={
                                  selectedOption1 === category
                                    ? "bg-deep-orange-800 text-c2 flex rounded-2xl justify-between items-center p-2"
                                    : "flex justify-between items-center p-4"
                                }
                              >
                                {category}
                                {selectedOption1 === category && (
                                  <CheckIcon className="w-5 h-5 text-green-500" />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Typography>
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
                      <Input
                        type="text"
                        size="md"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        placeholder="Supplier Name"
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                  </div>
                </form>
                <Typography className="text-c1 ml-20 mt-5 mb-2 right-0 justify-end font-semibold font-[Montserrat]">
                  Package Amount
                </Typography>

                <Typography
                  className="cursor-pointer  ml-20 right-0 justify-end pl-2 pb-2 mt-2 w-[250px] bg-deep-orange-800 py-2 rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                  onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                >
                  {selectedOption2 ? selectedOption2 : "Select package amount"}
                  {isDropdownOpen2 && (
                    <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                      {categoryMap[selectedOption1].map((packageAmount) => (
                        <li
                          key={packageAmount}
                          onClick={() => handleSelect2(packageAmount)}
                          className={
                            selectedOption2 === packageAmount
                              ? "bg-deep-orange-800 text-c2 flex rounded-2xl justify-between items-center p-2"
                              : "flex justify-between items-center p-4"
                          }
                        >
                          {packageAmount}
                          {selectedOption2 === packageAmount && (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </Typography>
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
