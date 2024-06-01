import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown";
import AdminDashboard from "./admindashboard";
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
import axiosInstance from "../../utils/axios";

function AddNewUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");

  const [branchOptions, setBranchOptions] = useState([]);
  const [userTypeOptions, setUserTypeOptions] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    contact: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/editUsers/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email,
            contact: data.contact,
          });
          setSelectedBranchName(data.branchName);
          setSelectedUserType(data.userType);
        })
        .catch((error) => {
          console.error("Error fetching raw stock usage data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    axiosInstance
      .get(`/getUserTypes`)
      .then((response) => {
        const userTypes = response.data.map((type) => type.userType);
        setUserTypeOptions(userTypes);
      })
      .catch((error) => {
        console.error("Error fetching UserType:", error);
      });

    axiosInstance
      .get(`/getBranchName`)
      .then((response) => {
        const branches = response.data.map((branch) => branch.branchName);
        setBranchOptions(branches);
      })
      .catch((error) => {
        console.error("Error fetching Branch names:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the values to check their types
    console.log("User Type:", selectedUserType);
    console.log("Branch Name:", selectedBranchName);

    if (!selectedUserType || !selectedBranchName || !formData) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const dataToSend = {
      ...formData,
      branchName: selectedBranchName,
      userType: selectedUserType,
    };

    const request = id
      ? axiosInstance.put(`/updateUser/${id}`, dataToSend)
      : axiosInstance.post("/addUser", dataToSend);

    request
      .then((response) => {
        toast.success(
          id ? "User updated successfully" : "User added successfully"
        );
        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          contact: "",
          password: "",
        });
        setSelectedUserType(null);
        setSelectedBranchName(null);
        navigate("/addUsers");
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <AdminDashboard>
      <div className="bg-deep-orange-900 pb-5">
        <div className="z-150 ml-5 mb-5 mr-5 bg-deep-orange-900 pt-10 h-[50px] rounded-2xl text-c3 hover:text-c1">
          <Card
            className="flex flex-col mb-6 justify-items-center h-[50px] sm:w-auto bg-c2 rounded-2xl z-80"
            shadow={true}
          >
            <div className="mb-2 gap-5 flex flex-col">
              <div className="gap-80 right-0 mr-10 w-[800px] flex-cols grid-cols-2 grid">
                <Typography className="text-2xl mt-5 ml-10 text-black font-bold font-[Montserrat]">
                  {id ? "Edit User Data" : "Add New User"}
                </Typography>
              </div>
              <Card
                className="flex flex-col pb-10 mb-10 ml-5 mr-5 h-[600px] bg-white  rounded-2xl z-80"
                shadow={false}
              >
                <form className="ml-20 mt-12 mb-2 w-[800px] 2xl:w-[1150px] sm:w-96">
                  <div className="mb-1 flex flex-col gap-y-8">
                    <div className="grid grid-cols-3 gap-10 mb-6">
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        First Name
                      </Typography>
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Last Name
                      </Typography>
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        User Name
                      </Typography>
                      <Input
                        type="text"
                        size="sm"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="firstName"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] w-[100px] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <Input
                        type="text"
                        size="sm"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="lastName"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] w-[100px] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <Input
                        type="text"
                        size="sm"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="userName"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] w-[100px] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-10 mb-6">
                      <Typography className="text-c1 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Email Address
                      </Typography>
                      <Typography className="text-c1 pl-2 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Contact No.
                      </Typography>
                      <Typography className="text-c1 pl-2 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        Password
                      </Typography>

                      <Input
                        type="email"
                        size="md"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        min={1}
                        placeholder="email"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <Input
                        type="tel"
                        size="md"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        min={1}
                        placeholder="contact"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                      <Input
                        type="password"
                        size="md"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        min={1}
                        placeholder="password"
                        className=" text-c1 pl-5 mt-2 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        required
                      />
                    </div>
                    <div className="w-[600px] grid grid-cols-2 gap-5 mb-6">
                      <Typography className="text-c1 pl-2 mt-2 font-bold text-xl font-[Montserrat] mb-2">
                        User Type
                      </Typography>
                      <Typography className="text-c1 pl-2 mt-2 ml-20 font-bold text-xl font-[Montserrat] mb-2">
                        Branch Name
                      </Typography>
                      <Dropdown
                        endpoint="getUserTypes"
                        selectedOption={selectedUserType}
                        setSelectedOption={setSelectedUserType}
                        label="Set User Type..."
                        options={userTypeOptions}
                        disabled={!!id}
                      />
                      <div className="ml-20">
                        <Dropdown
                          endpoint="getBranchName"
                          selectedOption={selectedBranchName}
                          setSelectedOption={setSelectedBranchName}
                          label="Set Branch"
                          options={branchOptions}
                          disabled={!!id}
                        />
                      </div>
                    </div>
                    <div className="w-[700px] flex justify-end">
                      <Link to="/addUsers">
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

export default AddNewUser;
