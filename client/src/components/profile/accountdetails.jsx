import React, { useEffect, useState } from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import getDecodedToken from "../../services/jwtdecoder";
import axiosInstance from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AccountDetails() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    contact: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const decodedToken = getDecodedToken();
  const [userId, setUserId] = useState(decodedToken?.id);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (decodedToken?.id) {
      setUserId(decodedToken.id); // Ensure userId is set only once
    }
  }, [decodedToken?.id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log(userId);
          const response = await axiosInstance.get(`/getProfileInfo/${userId}`);
          const user = response.data;
          setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            contact: user.contact,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear the error state

    // Validate newPassword and confirmNewPassword
    if (
      userData.newPassword &&
      userData.newPassword !== userData.confirmNewPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = getDecodedToken(token);
      if (decodedToken) {
        try {
          const updateData = {
            userID: userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName:userData.userName,
            contact: userData.contact,
            currentPassword: userData.currentPassword,
            newPassword: userData.newPassword,
          };

          await axiosInstance.put(`/updateuserprofile`, updateData);
          toast.success("Profile updated successfully");
          navigate("/"); // Redirect to profile page or any other page
        } catch (error) {
          console.error("Error updating profile:", error);
          setError(
            "Error updating profile: " +
              (error.response ? error.response.data.error : error.message)
          );
        }
      }
    }
  };

  return (
    <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[750px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[750px] sm:w-auto bg-gradient-to-br from-white to-c2 rounded-2xl z-80"
          shadow={false}
        >
          <form
            onSubmit={handleSubmit}
            className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                  First Name
                </Typography>
                <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                  Last Name
                </Typography>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="-mb-3 w-[400px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="-mb-3 w-[400px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                User Name
              </Typography>
              <div className="grid flex grid-cols-2 gap-5">
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userData.userName}
                  onChange={handleChange}
                  className="-mb-3 w-[400px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="-mb-3 -mt-2 text-c1 font-normal font-[Montserrat]">
                  Note: User Name will be the displayed name on your profile
                  once logged in.
                </Typography>
              </div>
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Contact No.
              </Typography>
              <Input
                type="tel"
                id="contact"
                name="contact"
                value={userData.contact}
                onChange={handleChange}
                className="-mb-3 w-[895px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-l text-c1 font-bold font-[Montserrat]">
                CHANGE PASSWORD
              </Typography>
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Current Password (Provide your current password to proceed with
                a new password)
              </Typography>
              <Input
                 type="password"
                 id="currentPassword"
                 name="currentPassword"
                 value={userData.currentPassword}
                 onChange={handleChange}
                className="-mb-3 w-[895px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                New Password (Leave blank to keep your old password)
              </Typography>
              <Input
                 type="password"
                 id="newPassword"
                 name="newPassword"
                 value={userData.newPassword}
                 onChange={handleChange}
                className="-mb-3 w-[895px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Confirm New Password (Leave blank to keep your old password)
              </Typography>
              <Input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={userData.confirmNewPassword}
                onChange={handleChange}
                className="-mb-3 w-[895px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {error && <p className="error">{error}</p>}
              <Button className="mt-4 w-[895px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </CustomerProfile>
  );
}

export default AccountDetails;
