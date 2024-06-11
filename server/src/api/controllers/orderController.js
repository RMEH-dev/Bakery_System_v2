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
const jsPDF  = require("jspdf");

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

exports.sendReceipt = async (req, res) => {
  const { orderID } = req.params;

  try {
    // Fetch order details
    const orderDetails = await getOrderDetails(orderID);

    // Generate PDF
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Receipt', 10, 10);
    // Add more details as needed
    doc.save(`receipt_${orderID}.pdf`);

    // Fetch user's email from the database
    const email = orderDetails.email; // Assuming `email` is part of `orderDetails`

    // Send email
    await sendReceiptEmail(email, 'Your Order Receipt', 'Please find your receipt attached.', [
      {
        filename: `receipt_${orderID}.pdf`,
        path: `./receipts/receipt_${orderID}.pdf`,
        contentType: 'application/pdf',
      },
    ]);

    res.status(200).json({ message: 'Receipt sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send receipt' });
  }
};

// Update customer alerts for a specific order
exports.updateCustomerAlerts = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { customerAlerts } = req.body;

    const sql = 'UPDATE orders SET customerAlert = ? WHERE orderID = ?';
    const values = [customerAlerts, orderID];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating customer alerts:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Customer alerts updated successfully" });
    });
  } catch (error) {
    console.error("Error updating customer alerts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};