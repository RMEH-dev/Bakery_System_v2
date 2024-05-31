import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cart } from "./cart";
import ShoppingCartTable2 from "../components/primary/tablecart2";
import axiosInstance from "../utils/axios";
import ShoppingCartTable1 from "./primary/tablecart";


export function ShoppingCart() {
  const { user_id } = useParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log(`Fetching cart items for user ID: ${user_id}`);
        const response = await axiosInstance.get(`/cart/${user_id}`);
        setCartItems(response.data);
        console.log(`Cart items fetched: `, response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };
    if (user_id) {
      fetchCartItems();
    }
  }, [user_id]);

  return (
    <div>
      <Cart>
        <div className=" bg-c2 w-[600px] h-[1000px] pb-36 lg:w-auto md:w-auto sm:w-auto sm:h-auto sm:text-wrap sm:text-md">
          <ShoppingCartTable1
           cartItems={cartItems} />
        </div>
      </Cart>
      <div className="flex flex-wrap justify-center gap-4 mt-10"></div>
    </div>
  );
}
