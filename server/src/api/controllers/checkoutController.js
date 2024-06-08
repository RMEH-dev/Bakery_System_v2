const CheckoutModel = require("../models/checkoutModel");
const db = require("../../config/databaseConnection");

exports.getAddress = (req,res) => {
  const userId = req.params.userId;

  if (!userId) {
      return res.status(400).json({ error: "userId is required" });
  }

  console.log(userId);
  CheckoutModel.getAddress(userId, (error, results) => {
    if (error) {
      console.error("Error fetching order details from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
    console.log(results);
  });
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CheckoutModel.getCartByUserId(userId);

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartID = cart[0].cartID;
    const cartItems = await CheckoutModel.getCartItemsByCartId(cartID);

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
    const { userID, cartID, deliveryID, couponCode, paymentType, orderType, addressID } = req.body;
  
    try {
      await db.query('BEGIN'); // Start transaction
  
      // Calculate subtotal
      const { cartItems, subtotal } = await CheckoutModel.calculateSubtotal(cartID);
  
      // Apply discount
      const { discountValue, discountID } = await CheckoutModel.getDiscount(couponCode);
  
      // Apply delivery charge
      const deliveryCharge = await CheckoutModel.getDeliveryCharge(deliveryID);
  
      const totalAmount = subtotal - discountValue + deliveryCharge;
  
      // Create Payment
      const paymentID = await CheckoutModel.createPayment(cartID, totalAmount, paymentType);
  
      // Create Order
      const orderID = await CheckoutModel.createOrder(userID, totalAmount, discountID, paymentID, orderType, deliveryID, addressID, paymentType);
  
      // Create Order Details
      await CheckoutModel.createOrderDetails(orderID, cartItems);
  
      await db.query('COMMIT'); // Commit transaction
  
      res.status(201).json({ orderID });
    } catch (error) {
      await db.query('ROLLBACK'); // Rollback transaction on error
      res.status(500).json({ error: error.message });
    }
  };
  
