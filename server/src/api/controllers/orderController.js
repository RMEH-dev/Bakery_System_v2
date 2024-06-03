const {
  getOrders,
  getOrderDetails,
  editOrder,
  updateOrderStatus,
  getPaymentID,
  updatePaymentStatus,
} = require("../models/orderModel");
const { generateOrderID } = require("../helpers/generateOrderID");
const db = require("../../config/databaseConnection");
const bcrypt = require("bcrypt");

exports.trackOrders = (req, res) => {
  getOrders([], (error, results) => {
    if (error) {
      console.error("Error fetching order details from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    console.log(results);
    res.json(results);
  });
};

exports.getOrderDetails = (req, res) => {
  const orderID = req.params.id;
  getOrderDetails(orderID, (error, results) => {
    if (error) {
      console.error("Error fetching order details from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    console.log(results);
    res.json(results);
  });
};

exports.editOrder = (req, res) => {
  const { id } = req.params;
  editOrder(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json(results[0]);
  });
  // res.json(rawStock);
};

// Promisify the query function

exports.updateOrderAndPaymentStatus = async (req, res) => {
  const { orderID } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  updateOrderStatus(orderID, orderStatus, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update order status" });
    }

    getPaymentID(orderID, (err, paymentID) => {
      if (err) {
        return res.status(500).json({ error: "Failed to retrieve paymentID" });
      }

      updatePaymentStatus(paymentID, paymentStatus, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to update payment status" });
        }

        res
          .status(200)
          .json({ message: "Order and payment status updated successfully" });
      });
    });
  });
};
