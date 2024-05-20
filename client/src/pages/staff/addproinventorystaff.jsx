import React, { useState, useEffect } from "react";
import StaffDashboard from "./staffDashboard";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrencyInput from "react-currency-input-field";
import axios from "axios"; // Import Axios

const categoryMap = {
  "Breads & Buns": ["Bread", "Bun"],
  Pastries: ["Puff Pastry", "Croissant"],
  "Cakes & Cupcakes": ["Cake", "Gateau", "Cupcake"],
  "Sweets & Desserts": ["Sweet", "Dessert"],
  Platters: ["Savory Platter", "Sweet Platter"],
  Beverages: ["Cold Beverage", "Hot Beverage"],
};

function AddProInventoryStaff() {
  const { id } = useParams();
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const [formData, setFormData] = useState({
    proStockName: "",
    manufactureDate: "",
    expirationDate: "",
    quantity: "",
    pricePerItem: "",
    availableFrom: "",
    availableTill: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/routes/getProStock/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            proStockName: data.proStockName,
            manufactureDate: data.proManuDate,
            expirationDate: data.proExpDate,
            category: data.category,
            subCategory: data.subCategory,
            availableFrom: data.availableFrom,
            availableTill: data.availableTill,
            pricePerItem: data.pricePerItem,
            quantity: data.proStockQuantity,
          });
          setSelectedOption1(data.category);
          setSelectedOption2(data.subCategory);
        })
        .catch((error) => {
          console.error("Error fetching pro stock data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData || !selectedOption1 || !selectedOption2) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const dataToSend = {
      ...formData,
      category: selectedOption1,
      subCategory: selectedOption2,
    };

    console.log("Data to send:", dataToSend);

    const request = id
      ? axios.put(
          `http://localhost:5000/api/routes/updateProStock/${id}`,
          dataToSend
        )
      : axios.post("http://localhost:5000/api/routes/addProStock", dataToSend);

    request
      .then((response) => {
        console.log(
          id
            ? "Produced stock updated successfully"
            : "Produced Stock added successfully",
          response.data
        );
        toast.success(
          id
            ? "Produced stock updated successfully"
            : "Produced Stock added successfully"
        );
        setFormData({
          proStockName: "",
          manufactureDate: "",
          expirationDate: "",
          quantity: "",
          pricePerItem: "",
          availableFrom: "",
          availableTill: "",
        });
        setSelectedOption1(null);
        setSelectedOption2(null);
      })
      .catch((error) => {
        console.error("Error sending data to the Server:", error);
        toast.error("Error sending data to the Server");
      });
  };

  return (
    <StaffDashboard>
      <div className="bg-c1 pb-20 h-[50px] 2xl:h-[150px]">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c1 pt-10 h-[100px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[100px] sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={false}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-c1 font-bold font-[Montserrat]">
                  {id ? "Edit Produced Inventory" : "Add Produced Inventory"}
                </Typography>
              </div>
              <Card
                className="flex flex-col mb-10 ml-10 h-[500px] mr-[50px] bg-white  rounded-2xl z-80"
                shadow={false}
              >
                <form className="ml-20 mt-12 mb-2 w-[800px] 2xl:w-[1150px]  sm:w-96">
                  <div className="mb-1 flex flex-col gap-y-8">
                    <div className="grid grid-cols-3 gap-10 mb-6">
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Produced Stock Name
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
                        name="proStockName"
                        value={formData.proStockName}
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
                        disabled={!!id}
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
                        disabled={!!id}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Produced Stock Category
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Sub Category
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Available From
                      </Typography>
                      <Typography
                        className="cursor-pointer pl-2 mt-1 items-center w-[200px] bg-deep-orange-800 py-2 justify-center rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                        onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                      >
                        {selectedOption1 ? selectedOption1 : "Select Category"}
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
                      <Typography
                        className="cursor-pointer pl-6 pt- mt-1 justify-center w-[250px] bg-deep-orange-800 py-2 rounded-lg text-c2 font-semibold text-lg font-[Montserrat]"
                        onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                      >
                        {selectedOption2
                          ? selectedOption2
                          : "Select Sub Category"}
                        {isDropdownOpen2 && (
                          <ul className="mt-5 mr-5 absolute z-10 cursor-pointer rounded-2xl text-c1 w-[250px] text-lg font-bold font-[Montserrat] bg-c5 max-h-64 overflow-y-auto shadow-lg">
                            {categoryMap[selectedOption1].map((subCategory) => (
                              <li
                                key={subCategory}
                                onClick={() => handleSelect2(subCategory)}
                                className={
                                  selectedOption2 === subCategory
                                    ? "bg-deep-orange-800 text-c2 flex rounded-2xl justify-between items-center p-2"
                                    : "flex justify-between items-center p-4"
                                }
                              >
                                {subCategory}
                                {selectedOption2 === subCategory && (
                                  <CheckIcon className="w-5 h-5 text-green-500" />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Typography>
                      <Input
                        type="time"
                        size="md"
                        placeholder="available from time"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleChange}
                        className="w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-10 mb-6">
                    <Typography className="text-c1 w-[300px] font-semibold font-[Montserrat] mt-5 mb-2">
                      Available Till
                    </Typography>
                    <Typography className="text-c1 w-[300px] font-semibold font-[Montserrat] mt-5 mb-2">
                      Price Per Item
                    </Typography>
                    <Typography className="text-c1 w-[300px] font-semibold font-[Montserrat] mt-5 mb-2">
                      Quantity
                    </Typography>
                    <Input
                      type="time"
                      size="md"
                      placeholder="available till time"
                      name="availableTill"
                      value={formData.availableTill}
                      onChange={handleChange}
                      className="w-[300px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      required
                    />
                    <CurrencyInput
                      size="md"
                      placeholder=" Price Per Item"
                      decimalScale={2}
                      name="pricePerItem"
                      value={formData.pricePerItem}
                      onChange={handleChange}
                      className="w-[300px] 2xl:w-[300px] pl-5 h-10 font-semibold font-[Montserrat] bg-c2 border-deep-orange-800 focus:!border-deep-orange-900 outline-2 outline-orange-400 rounded-md"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      required
                    />
                    <Input
                      type="number"
                      size="md"
                      placeholder="Specify Quantity"
                      name="quantity"
                      value={formData.quantity}
                      min="1"
                      step="1"
                      onChange={handleChange}
                      className="w-[300px] 2xl:w-[300px]  text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      disabled={!!id}
                      required
                    />
                  </div>
                </form>

                <div className="flex justify-end w-[800px] 2xl:w-[1150px]">
                  <Link to="/addProInventory">
                    <Button
                      onClick={handleSubmit}
                      className=" hover:bg-deep-orange-900 bg-c3 rounded-3xl hover:text-c2 text-white text-md font-[Montserrat]"
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
    </StaffDashboard>
  );
}

export default AddProInventoryStaff;
