import React from "react";

function ShoppingCartTable2({ cartItems, setCartItems }) {
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="bg-c2 rounded-2xl mt-10 font=[Montserrat] h-screen py-8">
      <div className="container font-medium font=[Montserrat] mx-auto px-4">
        <h1 className="text-2xl font-bold font=[Montserrat] mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img className="h-16 w-16 mr-4" src={item.imageUrl} alt={item.productName} />
                          <span className="font-semibold">{item.productName}</span>
                        </div>
                      </td>
                      <td className="py-4">Rs. {item.price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-2xl py-2 px-4 mr-2"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="text-center w-8">{item.quantity}</span>
                          <button
                            className="border rounded-2xl py-2 px-4 ml-2"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">Rs. {calculateSubtotal(item.price, item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>Rs.{calculateTotal()}</span>
              </div>
              <button className="bg-c3 text-white px-4 py-2 rounded-md w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartTable2;
