import "../../index.css";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { ProductCard } from "./productcard";
import { jwtDecode } from "jwt-decode";
import ReactPaginate from "react-paginate";

// Function to get the decoded token
const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/getCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching category: ", error.message);
      }
    };
    fetchCategories();
  }, []);

  

  const handleCategoryClick = (category, subCategory = null) => {
    if (subCategory) {
      navigate(
        `/products/${category.toLowerCase()}/${subCategory.toLowerCase()}`
      );
    } else {
      navigate(`/products/${category.toLowerCase()}`);
    }
  };

  return (
    <div>
      <ul className="pl-6 pt-5 pb-5 w-[300px] md:w-[300px] lg:w-[300px] xl:w-[320px] 2xl:w-[330px]  rounded-r-2xl bg-gradient-to-r from-c5 to-c2 text-c1 hover:text-c3 flex flex-col space-y-1">
        {categories.map(({ category, subCategories }) => (
          <li
            key={category}
            className="px-4 py-2 hover:text-deep-orange-800 cursor-pointer"
          >
            <span
              className="text-lg font-bold font-[Montserrat]"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </span>
            {subCategories && subCategories.length > 0 && (
              <ul className="pl-4">
                {subCategories.map((subCategory) => (
                  <li key={subCategory} className="px-2 py-1 hover:text-black">
                    <span
                      className="text-md font-[Montserrat] cursor-pointer"
                      onClick={() => handleCategoryClick(category, subCategory)}
                    >
                      {subCategory}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap">
        {categories.flatMap((category) =>
          (category.products || []).map((product) => (
            <ProductCard
              key={product.proStockBatchID}
              product={product}
              addToCart={addToCart()}
            />
          ))
        )}
      </div>
    </div>
  );
};
