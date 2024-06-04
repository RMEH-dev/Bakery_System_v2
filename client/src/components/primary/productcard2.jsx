import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import getDecodedToken from "../../services/jwtdecoder";
import axiosInstance from "../../utils/axios";
import QuantityBtn from "../quantitybtn";

export function ProductCard2({ product, selectedBranch }) {
  const [quantity, setQuantity] = useState(1);
  // console.log("ProductCard received addToCart:", addToCart);

  const addToCart = async (product, quantity) => {
    console.log("addToCart called with product:", product);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }
      const decodedToken = getDecodedToken(token);
      const userID = decodedToken.id;
      const response = await axiosInstance.post("/cart", {
        userID,
        proStockBatchID: product.proStockBatchID,
        branchName: selectedBranch,
        quantity,
      });
      console.log("Item added to cart:", response.data);
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      toast.error("Error adding item to cart.");
    }
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart called");
    if (!selectedBranch) {
      toast.error("Please select a branch first.");
      return;
    }
    if (!isAvailable || isExpired) {
      toast.error("Not Available at the moment");
      return;
    }
    addToCart(product, quantity);
    console.log("addToCart called");
  };

  const isAvailable = product.quantity > 0;
  const currentDate = new Date();
  const expDate = new Date(product.expDate);
  const isExpired = expDate <= currentDate;

  return (
    <Card className="w-[550px] bg-white text-c3 hover:text-c1 hover:bg-opacity-90 hover:duration-200 hover:transition-transform hover:translate-y-2 duration-500 ease-in-out hover:scale-105  cursor-pointer shadow-md shadow-c3 h-[550px]">
      <Link to={`/productsById/${product.proStockBatchID}`}>
        <CardHeader
          shadow={false}
          floated={false}
          className="h-[350px] hover:text-c1"
        >
          <img
            src={product.imageUrl}
            alt="card-image"
            className="h-full w-full object-cover hover:text-c1"
          />
        </CardHeader>
      </Link>
      <div className="grid hover:text-c1 grid:cols-2">
        <CardBody className="hover:text-c1">
          <div className="mb-1  flex justify-between">
            <Typography className="text-c1 hover:text-c1 font-bold font-[Montserrat] ">
              {product.proStockName}
            </Typography>
            <Typography className="font-bold font-[Montserrat] text-c1 text-opacity-100 text-nowrap">
              Rs. {product.pricePerItem}
            </Typography>
          </div>
          <Typography
            variant="small"
            className=" text-c3 font-medium font-[Montserrat] text-wrap" // Use grid with gap
          >
            <div>From: {product.availableFrom}</div>
            <div>Till: {product.availableTill}</div>
            <div className="flex justify-between items-center">
              {isExpired ? (
                <span className="text-red-500">Expired</span>
              ) : (
                <span
                  className={
                    isAvailable
                      ? "text-green-500 bold-[Montserrat] font-bold text-md"
                      : "text-red-500"
                  }
                >
                  {isAvailable ? "Available" : "Not Available"}
                </span>
              )}
              <div className="ml-10">
                <QuantityBtn
                  minValue={1}
                  maxValue={100}
                  onChange={setQuantity}
                />
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable || isExpired}
                class="cursor-pointer bg-c3 w-40 h-12 rounded-xl text-white hover:bg-deep-orange-900 hover:text-c2 duration-500"
              >
                Add to Cart
              </button>
            </div>
          </Typography>
        </CardBody>
      </div>
    </Card>
  );
}
