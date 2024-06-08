const db = require("../../config/databaseConnection");

const CheckoutModel = {
  getAddress: (userId, callback) => {
    const sqlGetAddress = `
    SELECT u.firstName, u.lastName, a.street, a.city, a.postCode, u.contact, u.email
    FROM addresses a
    JOIN user u ON a.userID = u.userID
    WHERE u.userID = ?
    `;
    db.query(sqlGetAddress, [userId], callback);
  },

  getCartByUserId: async (userId, callback) => {
    const cartQuery = "SELECT * FROM cart WHERE userID = $1";
    const cartResult = db.query(cartQuery, [userId], callback);
    return cartResult.rows;
  },

  getCartItemsByCartId: async (cartID, callback) => {
    const cartItemsQuery = "SELECT * FROM cartitem WHERE cartID = $1";
    const cartItemsResult = db.query(cartItemsQuery, [cartID], callback);
    return cartItemsResult.rows;
  },

  calculateSubtotal: async (cartID, callback) => {
    const cartItemsQuery = "SELECT * FROM cartitem WHERE cartID = $1";
    db.query(cartItemsQuery, [cartID], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const cartItems = result.rows;
        const subtotal = cartItems.reduce(
          (acc, item) => acc + item.pricePerItem * item.quantity,
          0
        );
        callback(null, { cartItems, subtotal });
      }
    });
  },

  getDiscount: async (couponCode, callback) => {
    if (!couponCode) {
      callback(null, { discountValue: 0, discountID: null });
      return;
    }

    const discountQuery = `
          SELECT d.discountID, d.discountValue FROM DiscountCoupon dc
          JOIN Discount d ON dc.discountID = d.discountID
          WHERE dc.couponCode = $1
        `;
    db.query(discountQuery, [couponCode], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, {
            discountValue: result.rows[0].discountvalue,
            discountID: result.rows[0].discountID,
          });
        } else {
          callback(null, { discountValue: 0, discountID: null });
        }
      }
    });
  },

  getDeliveryCharge: async (deliveryID, callback) => {
    const deliveryQuery = "SELECT * FROM Delivery WHERE deliveryID = $1";
    db.query(deliveryQuery, [deliveryID], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0].deliveryCharge);
      }
    });
  },

  createPayment: async (cartID, totalAmount, paymentType, callback) => {
    const paymentQuery = `
          INSERT INTO Payment (cartID, paymentAmount, paymentType, paymentStatus)
          VALUES ($1, $2, $3, $4) RETURNING paymentID
        `;
    const paymentStatus = paymentType === "Card" ? "Paid" : "Pending";
    db.query(
      paymentQuery,
      [cartID, totalAmount, paymentType, paymentStatus],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows[0].paymentID);
        }
      }
    );
  },

  createOrder: async (
    userID,
    totalAmount,
    discountID,
    paymentID,
    orderType,
    deliveryID,
    addressID,
    paymentType,
    callback
  ) => {
    const orderQuery = `
          INSERT INTO "Order" (userID, totalAmount, discountID, paymentID, couponID, orderType, orderStatus, deliveryID, addressID)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING orderID
        `;
    const orderStatus = paymentType === "Card" ? "Processing" : "Pending";
    db.query(
      orderQuery,
      [
        userID,
        totalAmount,
        discountID,
        paymentID,
        null,
        orderType,
        orderStatus,
        deliveryID,
        addressID,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows[0].orderID);
        }
      }
    );
  },

  createOrderDetails: async (orderID, cartItems, callback) => {
    const orderDetailsQuery = `
          INSERT INTO OrderDetails (orderID, proStockBatchID, quantity)
          VALUES ($1, $2, $3)
        `;
    try {
      for (const item of cartItems) {
        await db.query(orderDetailsQuery, [
          orderID,
          item.proStockBatchID,
          item.quantity,
        ]);
      }
      callback(null, true);
    } catch (err) {
      callback(err, null);
    }
  },
};

module.exports = CheckoutModel;
