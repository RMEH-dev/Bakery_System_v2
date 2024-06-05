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

export function ProductCard({ product, selectedBranch }) {
  // console.log("ProductCard received addToCart:", addToCart);

  const addToCart = async (product) => {
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
    if (!isAvailable) {
      toast.error("Not Available at the moment");
      return;
    }

    addToCart(product);
    console.log("addToCart called");
  };

  const isAvailable = product.quantity > 0;
  const currentDate = new Date();
  const expDate = new Date(product.expDate);
  const isExpired = expDate <= currentDate;

  return (
    <div>
      <ToastContainer />
      <Card className="w-[250px] bg-white text-c3 hover:text-c1 hover:bg-opacity-90 hover:duration-200 hover:transition-transform hover:translate-y-2 duration-500 ease-in-out hover:scale-105  cursor-pointer shadow-md shadow-c3 h-[350px]">
        <Link to={`/productsById/${product.proStockBatchID}`}>
          <CardHeader
            shadow={false}
            floated={false}
            className="h-[150px] hover:text-c1"
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
              className="text-c3 font-medium font-[Montserrat] text-wrap grid grid-cols-2 gap-y-2" // Use grid with gap
            >
              From: {product.availableFrom}
              <br />
              Till: {product.availableTill}
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable || isExpired}
                class="cursor-pointer flex items-center ml-6 mt-2 justify-center bg-c3 w-20 h-12 rounded-xl text-white hover:bg-deep-orange-900 hover:text-c2 duration-500"
              >
                Add to Cart
              </button>
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
            </Typography>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}
