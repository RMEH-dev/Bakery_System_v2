import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance.get("/cart");
            setCartItems(response.data);
            calculateCartTotal(response.data);
        } catch (error) {
            console.log("Error fetching cart items", error.message);
        }
    };

    
  const updateQuantity = async (cartItemID, quantity) => {
    try {
      await axiosInstance.put(`/cart`, { cartItemID, quantity });
      const updatedItems = cartItems.map(item =>
        item.cartItemID === cartItemID ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      calculateCartTotal(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const addToCart = async (product) => {
    try {
      await axiosInstance.post("/cart", { cartID: 1, proStockBatchID: product.id, quantity: 1 });
      fetchCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const calculateCartTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.pricePerItem * item.quantity, 0);
    setCartTotal(total);
  };

  const proceedToCheckout = async () => {
    try {
      await axiosInstance.post('/proceedToCheckout', { cartTotal });
      // Additional actions after checkout (e.g., navigate to a thank you page)
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, updateQuantity, addToCart, proceedToCheckout }}>
      {children}
    </CartContext.Provider>
  );
};