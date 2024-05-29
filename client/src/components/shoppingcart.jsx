import React, { Fragment, useState, useEffect } from "react";
import { Cart } from "./cart";
import axiosInstance from "../utils/axios";
import ShoppingCartTable2 from "./primary/tablecart2";


export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]); //state to hold product data

  useEffect(() => {
    fetchCartItems();
    fetchProducts(); // Fetch products data when component mounts
  }, []);

  const fetchCartItems = async () => {
    try{
      const response = await axiosInstance.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items: ", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axiosInstance.put(`/cart`, { cartItemID: productId, quantity });
      setCartItems(cartItems.map(item => item.productId === productId ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const addToCart = async (product) => {
    try{
      await axiosInstance.post("/cart", { cartID: 1, proStockID: product.id, quantity: 1 });
      fetchCartItems(); // Refresh cart items after adding a new item
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }


  return (
    <div>
      <Cart>
      <div className=" bg-white w-[600px] h-[1000px] pb-36 lg:w-auto md:w-auto sm:w-auto sm:h-auto sm:text-wrap sm:text-md">
      <ShoppingCartTable2 cartItems={cartItems} setCartItems={setCartItems} />
      </div>    
      </Cart>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {product.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
