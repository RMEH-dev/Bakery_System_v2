import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductList } from "./primary/productlist";
import { Typography } from "@material-tailwind/react";
import { ProductCard } from "./primary/productcard";
import axios from "axios";

export function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { category, subCategory } = useParams();
  const navigate = useNavigate();
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/routes/getProductsByCategory",
          {
            params: {
              page: currentPage,
              limit: productsPerPage,
              category,
              subCategory,
            },
          }
        );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / productsPerPage)); //
      } catch (error) {
        console.error("Error fetching products: ", error.message);
      }
    };
    fetchProducts();
  }, [currentPage, category, subCategory]);

  const handleCategoryClick = (
    category,
    subCategory = null
  ) => {
    setCurrentPage(1);
    navigate(
      `/bakery/${category}${
        subCategory ? `/${subCategory}` : ""
      }`
    );
  };

  return (
    <div className="bg-white bg-opacity-30 min-h-screen">
      <Typography>
        <div className="flex font-bold font-[Montserrat] text-2xl pl-10 pt-10">
          <Link to="/products">All Products&nbsp;/</Link>
          {category && (
            <Link to={`/bakery/${category}`}>
              {" "}
              &nbsp;{category}
            </Link>
          )}
          {subCategory && (
            <Link to={`/bakery/${category}/${subCategory}`}>
              {" "}
              &nbsp;/ {subCategory}
            </Link>
          )}
        </div>
      </Typography>

      <div className="pt-10">
        <div className="flex xl:grid-cols-2  gap-5">
          <div className="col-span-1">
            <ProductList onCategoryClick={handleCategoryClick} />
          </div>
          <div className="col-span-2 ">
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 p-10 rounded-2xl justify-center items-center bg-gradient-to-b from-c5 to-white w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] max-w-screen-xl  transition-all duration-1000 ease-in-out">
              {products.map((product) => (
                <ProductCard
                  className="mx-auto transform  hover:text-c2 transition-transform hover:scale-105"
                  key={product.proStockID}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-5 mt-5 pb-10 ">
          <button
            className="justify-end px-4 py-2  font-[Montserrat] text-lg font-bold bg-c3 rounded-2xl text-white transform transition-transform duration-500 ease-in-out hover:scale-105"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            className="mx-2 px-4 py-2 font-[Montserrat] text-lg font-bold justify-end bg-c3 text-white rounded-2xl transform transition-transform duration-500 ease-in-out hover:scale-105"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
