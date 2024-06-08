import React, { useState, useEffect } from "react";
import { Cart } from "./cart";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getDecodedToken from "../services/jwtdecoder";

export function Checkout() {
  const decodedToken = getDecodedToken();
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postCode: "",
    contact: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
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
    const fetchAddress = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log(userId);
          const response = await axiosInstance.get(`/getAddress/${userId}`);
          console.log(response.data);
          const address = response.data[0];
            setAddressData({
              firstName: address?.firstName || "",
              lastName: address?.lastName || "",
              street: address?.street || "",
              city: address?.city || "",
              postCode: address?.postCode || "",
              contact: address?.contact || "",
              email: address?.email || "",
            });
            console.log("Updated addressData state:", addressData); 
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get(`/cart/${userId}`);
          setCartItems(response.data);
          const subtotal = response.data.reduce(
            (acc, item) => acc + item.pricePerItem * item.quantity,
            0
          );
          setTotal(subtotal);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    if (userId) {
      fetchAddress();
      fetchCart();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      [name]: value,
    }));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleSelect3 = (option) => {
    setSelectedOption3(option);
    setIsDropdownOpen3(false);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.street || !address.city || !address.postCode) {
      toast.error("Please input your address details.");
      return;
    }

    const orderDetails = {
      userID: userId,
      deliveryID: selectedOption,
      paymentType: selectedOption2,
      couponCode: couponCode,
      orderType: selectedOption ? "Delivery" : "Pickup",
      addressID: address.addressID,
    };

    try {
      const response = await axiosInstance.post("/createOrder", orderDetails);
      if (response.data.orderID) {
        toast.success("Order placed successfully!");
        navigate(`/orderSuccess/${userId}`);
      }
    } catch (error) {
      toast.error("Error placing order.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <Cart>
      <ToastContainer />
      <div className="z-80 mt-12 ml-[20px] h-[750px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[850px] mb-6 rounded-2xl bg-c4 text-c1 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[750px] 2xl:w-[850px] sm:w-auto bg-gradient-to-tr from-c2 to-white rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography className="-mb-3 text-xl text-c1 font-bold font-[Montserrat]">
                Billing Address
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                  First Name
                </Typography>
                <Typography className="-mb-3 -ml-12 text-c1 font-semibold font-[Montserrat]">
                  Last Name
                </Typography>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={addressData.firstName}
                  onChange={handleChange}
                  className="-mb-3 w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={addressData.lastName}
                  onChange={handleChange}
                  className="-mb-3 -ml-12 w-[350px] 2xl:w-[300px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Street Address
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <Input
                  type="text"
                  id="street"
                  name="street"
                  value={addressData.street}
                  onChange={handleChange}
                  className="-mb-3 w-[550px] 2xl:w-[745px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Town / City
              </Typography>
              <Input
                type="text"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleChange}
                className="-mb-3 w-[65px] 2xl:w-[745px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Postcode / ZIP
              </Typography>
              <Input
                type="text"
                id="postCode"
                name="postCode"
                value={addressData.postCode}
                onChange={handleChange}
                className="-mb-3 w-[895px] 2xl:w-[745px] text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Contact No.
              </Typography>
              <Input
                type="tel"
                id="contact"
                name="contact"
                value={addressData.contact}
                onChange={handleChange}
                className=" text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-c1 font-semibold font-[Montserrat]">
                Email Address
              </Typography>
              <Input
                type="text"
                id="email"
                name="email"
                value={addressData.email}
                onChange={handleChange}
                className="-mb-3 w-[895px] 2xl:w-[745px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
              />
              <Checkbox
                className="bg-c1 w-6 h-6"
                label={
                  <Typography className="mt-3 text-xl text-c1 font-[Montserrat] flex items-center font-bold">
                    Receive promotional SMS & Updates
                  </Typography>
                }
                containerProps={{ className: "mt-3" }}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
          </form>
        </Card>
      </div>
      <div className="z-150 -mt-[775px] mb-6  ml-[900px] h-[820px] w-[300px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[580px] rounded-2xl bg-c4 text-c3 hover:text-c1 space-y-1">
        <Card
          className="flex flex-col justify-items-center h-[820px] sm:w-auto bg-gradient-to-tr from-c4 to-c2 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[25px] mt-5 mb-2 w-[300px] 2xl:w-[800px] h-150 max-w-screen-lg sm:w-96">
            <div className="relative w-[500px]">
              <Typography className="text-c1 font-semibold font-[Montserrat]">
                Delivery or Pickup
              </Typography>
              <button
                type="button"
                className="mt-2 inline-flex w-full justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium font-[Montserrat] text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-deep-orange-800 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedOption || "Select an option"}
                <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 absolute z-10 w-full font-[Montserrat] rounded-md bg-white shadow-lg">
                  <ul
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect("Pickup")}
                      >
                        Pickup
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect("Delivery")}
                      >
                        Delivery
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative w-[500px]">
              <Typography className="text-c1 mt-10 font-semibold font-[Montserrat]">
                Payment Options
              </Typography>
              <button
                type="button"
                className="mt-2 inline-flex w-full justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium font-[Montserrat] text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-deep-orange-800 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              >
                {selectedOption2 || "Select an option"}
                <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
              </button>
              {isDropdownOpen2 && (
                <div className="mt-2 absolute z-10 w-full font-[Montserrat] rounded-md bg-white shadow-lg">
                  <ul
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect2("Cash")}
                      >
                        Cash
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect2("Card")}
                      >
                        Card
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative w-[500px]">
              <Typography className="text-c1 mt-10 font-semibold font-[Montserrat]">
                Discount Type
              </Typography>
              <button
                type="button"
                className="mt-2 inline-flex w-full justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium font-[Montserrat] text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-deep-orange-800 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setIsDropdownOpen3(!isDropdownOpen3)}
              >
                {selectedOption3 || "Select an option"}
                <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
              </button>
              {isDropdownOpen3 && (
                <div className="mt-2 absolute z-10 w-full font-[Montserrat] rounded-md bg-white shadow-lg">
                  <ul
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect3("Seasonal")}
                      >
                        Seasonal
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleSelect3("Coupon")}
                      >
                        Coupon
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-10 mb-6 flex flex-col gap-y-2 gap-x-6">
              <Typography className="text-c1 font-semibold font-[Montserrat]">
                Coupon Code
              </Typography>
              <div className="flex w-[350px] items-center gap-3">
                <Input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  value={couponCode}
                  onChange={handleCouponChange}
                  className="w-[100px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-deep-orange-800 focus:border-deep-orange-800"
                />
                <Button
                  className="w-[200px] bg-gradient-to-r from-deep-orange-800 to-c3 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-deep-orange-200 dark:focus:ring-deep-orange-500 shadow-lg shadow-deep-orange-500/50 dark:shadow-lg dark:shadow-deep-orange-800 font-[Montserrat] font-extrabold text-sm"
                  type="button"
                >
                  Apply
                </Button>
              </div>
            </div>
            <h2 className="text-lg font-bold text-c1 font-[Montserrat] mb-4">
              Payment Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs. </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span>Rs. </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>Rs. </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">Rs. {total.toFixed(2)}</span>
            </div>
            <Button
              className="mt-4 bg-gradient-to-r from-c1 to-c3 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-deep-orange-200 dark:focus:ring-deep-orange-500 shadow-lg shadow-deep-orange-500/50 dark:shadow-lg dark:shadow-deep-orange-800 font-[Montserrat] font-extrabold text-lg"
              type="submit"
            >
              Pay Total
            </Button>
          </form>
        </Card>
      </div>
    </Cart>
  );
}
