import React, { useEffect, useState } from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import ShippingAddress from "./shippingaddress";
import BillingAddress from "./billingaddress";
import getDecodedToken from "../../services/jwtdecoder";
import axiosInstance from "../../utils/axios";

import { Link } from "react-router-dom";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function Address() {
  const [address, setAddress] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    postCode: "",
  });
  const [editedAddress, setEditedAddress] = useState({
    street: "",
    city: "",
    postCode: "",
  });

  const decodedToken = getDecodedToken();
  const userId = decodedToken?.id;

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/userAddress?userId=${userId}`)
        .then((response) => {
          setAddress(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [userId]);

  const handleAddAddress = () => {
    axiosInstance
      .post("/userAddress", { userId, ...newAddress })
      .then((response) => {
        setAddress({ ...newAddress, addressID: response.data.addressId });
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const handleEditAddress = () => {
    axiosInstance
      .put("/userAddress", { userId, ...editedAddress })
      .then((response) => {
        setAddress({ ...editedAddress, userID: userId });
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddModalOpen) {
      setNewAddress({ ...newAddress, [name]: value });
    } else if (isEditModalOpen) {
      setEditedAddress({ ...editedAddress, [name]: value });
    }
  };

  const handleEditModalOpen = () => {
    setEditedAddress({ ...address });
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[300px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[300px] sm:w-auto bg-gradient-to-bl from-white to-c4 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                  Billing & Shipping Address
                </Typography>
                {address ? (
                  <>
                    <div>
                      <Typography className="text-black">
                        {address.street}
                      </Typography>
                      <Typography className="text-black">
                        {address.city}
                      </Typography>
                      <Typography className="text-black">
                        {address.postCode}
                      </Typography>
                      <Button
                        className="mt-2 w-[100px] items-center justify-between hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]"
                        onClick={handleEditModalOpen}
                      >
                        Edit
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="#" onClick={() => setIsAddModalOpen(true)}>
                      <Button className="mt-2 w-[100px] items-center justify-between hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                        Add
                      </Button>
                    </Link>
                    <Link to="#">
                      <Button className="mt-2 w-[100px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-md font-[Montserrat]">
                        Add
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
      <Dialog
        className="bg-white font-[Montserrat]  rounded-2xl mb-5"
        open={isAddModalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle className="bg-white text-c3 font-bold font-[Montserrat]  rounded-2xl mb-5">
          Add New Address
        </DialogTitle>
        <DialogContent className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5">
          <TextField
            className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5"
            name="street"
            label="Street"
            value={newAddress.street}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="city"
            label="City"
            value={newAddress.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="postCode"
            label="Post Code"
            value={newAddress.postCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddAddress}
            color="primary"
            className="bg-c3 rounded-2xl mb-5"
          >
            Add
          </Button>
          <Button
            onClick={handleModalClose}
            color="secondary"
            className="bg-red-800 rounded-2xl mr-3 mb-5"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className="bg-white font-[Montserrat]  rounded-2xl mb-5"
        open={isEditModalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle className="bg-white text-c3 font-bold font-[Montserrat]  rounded-2xl mb-5">
          Edit Address
        </DialogTitle>
        <DialogContent className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5">
          <TextField
            className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5"
            name="street"
            label="Street"
            value={editedAddress.street}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5"
            name="city"
            label="City"
            value={editedAddress.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            className="bg-white text-c3 font-bold font-[Montserrat] rounded-2xl mb-5"
            name="postCode"
            label="Post Code"
            value={editedAddress.postCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditAddress}
            color="primary"
            className="bg-c3 rounded-2xl mb-5"
          >
            Save
          </Button>
          <Button
            onClick={handleModalClose}
            color="secondary"
            className="bg-red-800 rounded-2xl mr-3 mb-5"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </CustomerProfile>
  );
}

export default Address;
