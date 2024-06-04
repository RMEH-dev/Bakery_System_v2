import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductList } from "./primary/productlist";
import { Typography } from "@material-tailwind/react";
import { ProductCard } from "./primary/productcard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "../utils/axios";
import BranchSelector2 from "./branchSelector2";
import { ProductCard2 } from "./primary/productcard2";

export function ProductIdCard() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProducts(response.data[0]); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductById();
  }, [id]); // Fetch again if id changes

  if (!products) {
    return <div>Loading product...</div>; // Or display a loading indicator
  }

  return (
    <div className="bg-white bg-opacity-30 min-h-screen">
      <ToastContainer />
      <div className="flex grid-cols-2 gap-20">
        <Typography>
          <div className="flex font-bold font-[Montserrat] text-2xl pl-10 pt-10">
            <Link to="/products">All Products&nbsp;</Link>
          </div>
        </Typography>
        <div className="mr-10 justify-end mt-7 items-center">
  
        </div>
      </div>
      <div className="pt-10">
        <div className="flex xl:grid-cols-2  gap-5">
          <div className="col-span-1">

          </div>
          <div className="col-span-2 ">
            <div className="flex justify-start pl-20 ml-20 mb-10 rounded-2xl items-center bg-gradient-to-tl from-c2 to-c5 h-[700px] w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1700px] max-w-screen-2xl  transition-all duration-1000 ease-in-out">
             {products && (
                <ProductCard2
                  className="mx-auto transform  hover:text-c2 transition-transform hover:scale-105"
                  key={products.proStockBatchID}
                  product={products}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
