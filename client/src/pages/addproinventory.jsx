import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminDashboard from "./admin/admindashboard";
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
import CurrencyInput from "react-currency-input-field";
import axiosInstance from "../utils/axios"
import axios from "axios";
import Dropdown from "../components/dropdown";
import DropdownWithAdd from "../components/dropdownwithadd";


function AddProInventory() {
  const { id } = useParams();
  // const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedProStockName, setSelectedProStockName] = useState("");
  const [selectedProStockCategory, setSelectedProStockCategory] = useState("");
  const [selectedProStockSubCategory, setSelectedProStockSubCategory] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");


  const [formData, setFormData] = useState({
    manufactureDate: "",
    expirationDate: "",
    quantity: "",
    pricePerItem: "",
    availableFrom: "",
    availableTill: "",
    branchID: "",
  });

  useEffect(() => {

     // Fetch user role and branch
     axiosInstance.get("/getCurrentUser")
     .then(response => {
       const user = response.data;
       setUserRole(user.userType);
       setUserBranch(user.branchID);
       setSelectedBranch(user.branchID);
     })
     .catch(error => {
       console.error("Error fetching user data:", error);
     });


    if (id) {
      axiosInstance
        .get(`/getProStock/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            manufactureDate: data.manuDate,
            expirationDate: data.expDate,
            quantity: data.quantity,
            pricePerItem: data.pricePerItem,
            availableFrom: data.availableFrom,
            availableTill: data.availableTill,
            branchID: data.branchID,
          });
          setSelectedProStockName(data.proStockName); 
          setSelectedProStockCategory(data.category);
          setSelectedProStockSubCategory(data.subCategory);
          setSelectedBranch(data.branchID);
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


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData || !selectedProStockName || !selectedProStockCategory || !selectedProStockSubCategory) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const dataToSend = {
      ...formData,
      proStockName: selectedProStockName,
      category: selectedProStockCategory,
      subCategory: selectedProStockSubCategory,  
      branchID: userRole === 'Admin' ? selectedBranch : userBranch,
    };

    console.log("Data to send:", dataToSend);

    const request = id
      ?  axiosInstance.put(
          `/updateProStock/${id}`,
          dataToSend
        )
      :  axiosInstance.post("/addProStock", dataToSend);

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
          manufactureDate: "",
          expirationDate: "",
          quantity: "",
          pricePerItem: "",
          availableFrom: "",
          availableTill: "",
          branchID: "",
        });
        setSelectedProStockName(null); 
        setSelectedProStockCategory(null);
        setSelectedProStockSubCategory(null);
        setSelectedBranch("")
      })
      .catch((error) => {
        console.error("Error sending data to the Server:", error);
        toast.error("Error sending data to the Server");
      });
  };
  return (
    <AdminDashboard>
      <div className="bg-c1 pb-20 h-[50px] 2xl:h-[150px]">
        <div className="z-150 ml-5 mb-5 mr-5 bg-c2 pt-10 h-[100px] rounded-2xl text-c3 hover:text-c1">
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
                      <DropdownWithAdd
                        endpoint="getProStockNames"
                        selectedOption={selectedProStockName}
                        setSelectedOption={setSelectedProStockName}
                        label="Pro Stock Name"
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
                        Category
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Sub Category
                      </Typography>
                      <Typography className="text-c1 font-semibold font-[Montserrat] mb-2">
                        Available From
                      </Typography>
                      <DropdownWithAdd
                        endpoint="getProStockCategory"
                        selectedOption={selectedProStockCategory}
                        setSelectedOption={setSelectedProStockCategory}
                        label="Category"
                        // disabled={!!id}
                      />
                      <DropdownWithAdd
                        endpoint="getProStockSubCategory"
                        selectedOption={selectedProStockSubCategory}
                        setSelectedOption={setSelectedProStockSubCategory}
                        label="Sub Category"
                        // disabled={!!id}
                      />
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
                  {userRole === "Admin" && (
                    <div className="mb-4">
                      <BranchSelector
                        selectedBranch={selectedBranch}
                        setSelectedBranch={setSelectedBranch}
                        userType={userRole}
                      />
                    </div>
                  )}
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
    </AdminDashboard>
  );
}

export default AddProInventory;
