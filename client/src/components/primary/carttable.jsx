import React from "react";
import { Typography } from "@material-tailwind/react";

export function CartTable({ cartItems }) {
  return (
    <div>
      <Typography variant="h5">Cart</Typography>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
