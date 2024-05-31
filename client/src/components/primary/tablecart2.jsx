import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { jwtDecode } from "jwt-decode";


const ShoppingCartTable2 = ({ cartItems: initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (itemId, amount) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.cartItemID === itemId
          ? {
              ...item,
              quantity: item.quantity + amount > 0 ? item.quantity + amount : 1,
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0);
  const taxes = subtotal * 0.1; // Assume 10% tax rate
  const shipping = 15; // Assume flat shipping rate
  const total = subtotal + taxes + shipping;


  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.cartItemID}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            alt={item.proStockName}
                          />
                          <span className="font-semibold">{item.proStockName}</span>
                        </div>
                      </td>
                      <td className="py-4">${item.pricePerItem.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2"
                            onClick={() => handleQuantityChange(item.cartItemID, -1)}
                          >
                            -
                          </button>
                          <span className="text-center w-8">
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
                      <td className="py-4">
                        ${(item.pricePerItem * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>Rs. {taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">Rs. {total.toFixed(2)}</span>
              </div>
              <button className="bg-c3 font-[Montserrat] font-bold text-white py-2 px-4 rounded-lg mt-4 w-full">
                 Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTable2;
