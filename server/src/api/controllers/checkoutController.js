const CheckoutModel = require("../models/checkoutModel");
const generateOrderID = require("../helpers/generateOrderID");
const db = require("../../config/databaseConnection");

exports.getAddress = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  CheckoutModel.getAddress(userId, (error, results) => {
    if (error) {
      console.error("Error fetching address details from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getCart = async (req, res) => {
  const userId = req.params.userId;

  console.log(userId)
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const cartResults = await new Promise((resolve, reject) => {
      CheckoutModel.getCartByUserId(userId, (error, results) => {
        if (error) {
          console.error("Error fetching cart from the database:", error);
          reject({ status: 500, error: "Database query error" });
        }

        if (results.length === 0) {
          reject({ status: 404, message: "Cart not found" });
        }

        resolve(results);
      });
    });

    const cartID = cartResults[0].cartID;

    const items = await new Promise((resolve, reject) => {
      CheckoutModel.getCartItemsByCartId(cartID, (err, items) => {
        if (err) {
          console.error("Error fetching cart items from the database:", err);
          reject({ status: 500, error: "Database query error" });
        }
        resolve(items);
      });
    });

    res.json(items);
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

exports.createPayment = (req, res) => {
  const { cartID, paymentAmount, paymentType, paymentDate, paymentStatus } = req.body;

  if (!cartID || !paymentAmount || !paymentType || !paymentDate || !paymentStatus) {
    return res.status(400).json({ error: "All payment details are required" });
  }

  const paymentData = {
    cartID,
    paymentAmount,
    paymentType,
    paymentDate,
    paymentStatus
  };

  CheckoutModel.createPayment(paymentData, (error, results) => {
    if (error) {
      console.error("Error creating payment in the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ paymentID: results.insertId });
  });
};

exports.generateOrderID = (req, res) => {
  CheckoutModel.generateOrderID((error, results) => {
    if (error) {
      console.error("Error generating order ID:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ newOrderID: results[0].newOrderID });
  });
};

exports.createOrder = (req, res) => {
  const { orderID, userID, orderDate, totalAmount, paymentID, orderType, orderStatus, deliveryID, addressID } = req.body;

  console.log(req.body)
  if (!orderID || !userID || !orderDate || !totalAmount || !paymentID || !orderType || !orderStatus  || !deliveryID || !addressID) {
    return res.status(400).json({ error: "All order details are required" });
  }

  const orderData = {
    orderID,
    userID,
    orderDate,
    totalAmount,
    paymentID,
    orderType,
    orderStatus,
    deliveryID,
    addressID
  };

  CheckoutModel.createOrder(orderData, (error, results) => {
    if (error) {
      console.error("Error creating order in the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ message: "Order created successfully" });
  });
};

exports.createOrderDetails = (req, res) => {
  const { orderDetails } = req.body;

  if (!orderDetails || !orderDetails.length) {
    return res.status(400).json({ error: "Order details are required" });
  }

  CheckoutModel.createOrderDetails(orderDetails, (error, results) => {
    if (error) {
      console.error("Error creating order details in the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ message: "Order details created successfully" });
  });
};

exports.clearCart = (req, res) => {
  const cartId = req.params.cartId;

  if (!cartId) {
    return res.status(400).json({ error: "cartId is required" });
  }

  CheckoutModel.clearCart(cartId, (error, results) => {
    if (error) {
      console.error("Error clearing cart in the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ message: "Cart cleared successfully" });
  });
};

exports.getDeliveryCharge = (req, res) => {
  const option = req.params.option;

  CheckoutModel.getDeliveryChargeByType(option, (error, deliveryData) => {
    if (error) {
      console.error("Error fetching delivery charge from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }

    if (!deliveryData) {
      return res.status(404).json({ message: "Delivery type not found" });
    }
    const { deliveryCharge, deliveryID } = deliveryData;

    res.json({ deliveryCharge, deliveryID });
  });
};
