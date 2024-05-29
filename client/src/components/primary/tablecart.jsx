import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import axiosInstance from "../../utils/axios";

function ShoppingCartTable() {
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
        // Assuming this endpoint fetches the initial cart items from the server if needed
      const response = await axiosInstance.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items: ", error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
      )
    );
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <Box>
      <TableContainer  className="bg-c2 align-middle text-center text-white rounded-t-2xl font-[Montserrat] ">
        <Table>
          <TableHead className="text-white align-middle text-center font-[Montserrat]">
            <TableRow  className="text-white align-middle text-center font-[Montserrat]">
              <TableCell>Product</TableCell>
              <TableCell>Price Per Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {calculateSubtotal(item.price, item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={cartItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default ShoppingCartTable;
