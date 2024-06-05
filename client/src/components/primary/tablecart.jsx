import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../hooks/cartContext";
import { jwtDecode } from "jwt-decode"; // Assuming jwtDecode is imported correctly

const ShoppingCartTable1 = ({ cartItems, setCartItems }) => {
  const {userId } = useParams();
  const { updateQuantity, proceedToCheckout } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the backend
    axiosInstance
      .get(`/cart/${userId}`) // Replace with your actual endpoint
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [userId, setCartItems]);

  const handleQuantityChange = (itemId, amount) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemID === itemId) {
        const originalQuantity = item.quantity;
        const newQuantity = item.quantity + amount > 0 ? item.quantity + amount : 1;
        axiosInstance.post("/cart/updateQuantity", { cartItemID: itemId, newQuantity, proStockBatchID: item.proStockBatchID, originalQuantity })
          .then(() => {
            toast.success("Quantity updated.");
          })
          .catch((error) => {
            console.error("Error updating quantity:", error);
            toast.error("Error updating quantity.");
          });
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };;

  const handleRemoveItem = (itemId, proStockBatchID, quantity) => {
    axiosInstance.post("/cart/remove", { cartItemID: itemId, proStockBatchID, quantity })
      .then(() => {
        setCartItems(cartItems.filter(item => item.cartItemID !== itemId));
        toast.success("Item removed from cart.");
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        toast.error("Error removing item.");
      });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0);
  const total = subtotal;

  const handleCheckout = () => {
    // Implement checkout functionality here
    console.log("Proceeding to checkout...");
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="bg-white mt-10 h-screen py-8 overflow-y-auto relative">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold font-[Montserrat] mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-c2 mt-5 font-[Montserrat] text-lg text-c1 rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead >
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th className="text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.cartItemID}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={item.imageUrl} // Assuming the item object has an imageURL property
                            className="h-20 w-20 mr-4"
                          />
                          <span className="font-medium">{item.proStockName}</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold">Rs. {item.pricePerItem.toFixed(2)}</td>
                      <td className="py-4 font-bold">
                        <div className="flex items-center font-bold">
                          <button
                            className="border rounded-md font-bold py-2 px-4 mr-2"
                            onClick={() => handleQuantityChange(item.cartItemID, -1)}
                          >
                            -
                          </button>
                          <span className="text-center w-8 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => handleQuantityChange(item.cartItemID, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-bold">
                        Rs. {(item.pricePerItem * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <button
                          className="border rounded-md py-2 px-4 ml-2 bg-red-500 text-white"
                          onClick={() => handleRemoveItem(item.cartItemID, item.proStockBatchID, item.quantity)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-gradient-to-b from-c4 to-c2 font-[Montserrat] mt-5 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">Rs. {total.toFixed(2)}</span>
              </div>
              <Link to={`/checkout/${userId}`}>
              <button 
                className="bg-c3 font-[Montserrat] font-bold text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTable1;
