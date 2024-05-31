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
import axiosInstance from "../utils/axios";
import axios from "axios";
import Dropdown from "../components/dropdown";
import DropdownWithAdd from "../components/dropdownwithadd";
import BranchSelector from "../components/branchSelector";
import { jwtDecode } from "jwt-decode";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { v4 } from "uuid";

const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  return jwtDecode(token);
};

// const storage = firebase.storage();

function AddProInventory() {
  const { id } = useParams();
  // const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedProStockName, setSelectedProStockName] = useState("");
  const [selectedProStockCategory, setSelectedProStockCategory] = useState("");
  const [selectedProStockSubCategory, setSelectedProStockSubCategory] =
    useState("");
  const [userRole, setUserRole] = useState("");
  const [userBranch, setUserBranch] = useState();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [imageFile, setImageFile] = useState(null);

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
    const user = getDecodedToken(); // Decode JWT to get user data
    setUserRole(user.userType);
    setUserBranch(user.branchID);

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

  const handlePriceChange = (value) => {
    setFormData({ ...formData, pricePerItem: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData ||
      !selectedProStockName ||
      !selectedProStockCategory ||
      !selectedProStockSubCategory
    ) {
      toast.error("Please fill out all the fields.");
      return;
    }

    try {
      let imageUrl = null;
      if (!id && imageFile) {
        // Generate a unique name for the image
        const uniqueImageName = `${imageFile.name}-${v4()}`;
        const imageRef = ref(storage, `images/${uniqueImageName}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      if (id) {
        updateData();
      } else {
        saveFromData(imageUrl);
      }
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        toast.error("Network error, please check your internet connection.");
      } else {
        console.error("Error uploading image to Firebase Storage", error);
        toast.error("Error uploading image to Firebase Storage");
      }
    }
  };

  const saveFromData = (imageUrl) => {
    const dataToSend = {
      ...formData,
      proStockName: selectedProStockName,
      category: selectedProStockCategory,
      subCategory: selectedProStockSubCategory,
      branchID: userBranch,
      imageUrl: imageUrl,
    };

    console.log("Data to send:", dataToSend);

    axiosInstance
      .post("/addProStock", dataToSend)
      .then((response) => {
        console.log("Produced Stock added successfully", response.data);
        toast.success("Produced Stock added successfully");
        resetForm();
      })
      .catch((error) => {
        console.error("Error sending data to the Server:", error);
        toast.error("Error sending data to the Server");
      });
  };

  const updateData = () => {
    const dataToSend = {
      ...formData,
      proStockName: selectedProStockName,
      category: selectedProStockCategory,
      subCategory: selectedProStockSubCategory,
      branchID: userBranch,
    };

    console.log("Data to send2:", dataToSend);
    console.log(id);
    axiosInstance
      .put(`/updateProStock/${id}`, dataToSend)
      .then((response) => {
        console.log("Produced stock updated successfully", response.data);
        toast.success("Produced stock updated successfully");
        resetForm();
      })
      .catch((error) => {
        console.error("Error sending data to the Server:", error);
        toast.error("Error sending data to the Server");
      });
  };

  const resetForm = () => {
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
    setSelectedBranch("");
    setImageFile(null);
  };

  return (
    <AdminDashboard>
      <div className="bg-c1 pt-10 pb-10">
        <div className="z-150 ml-5  mb-5 mr-5 pt- pb-10 pr-10 bg-c2  h-[100px] rounded-2xl text-c3 hover:text-c1">
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
                className="flex flex-col mb-10 pr-5 ml-10 h-[900px]  bg-white  rounded-2xl z-80"
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
                      className="w-[300px] 2xl:w-[300px]  text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      disabled={!!id}
                      required
                    />
                  </div>
                  <Typography className="text-c1 w-[300px]  font-semibold font-[Montserrat] mt-5 mb-2">
                    Upload Image
                  </Typography>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-[200px] pb-2 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
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
