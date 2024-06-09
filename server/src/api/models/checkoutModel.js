const db = require("../../config/databaseConnection");

const CheckoutModel = {
  getAddress: (userId, callback) => {
    const sqlGetAddress = `
    SELECT u.firstName, u.lastName, a.street, a.city, a.postCode, u.contact, u.email, a.addressID
    FROM addresses a
    JOIN user u ON a.userID = u.userID
    WHERE u.userID = ?
    `;
    db.query(sqlGetAddress, [userId], callback);
  },

  getCartByUserId: async (userId, callback) => {
    const cartQuery = "SELECT * FROM cart WHERE userID = ?";
    db.query(cartQuery, [userId], callback);
  },

  getCartItemsByCartId: async (cartID, callback) => {
    const cartItemsQuery = "SELECT * FROM cartitem WHERE cartID = ?";
    db.query(cartItemsQuery, [cartID], callback);
  },

  getCartTotal: (cartID, callback) => {
    const cartTotalQuery = "SELECT cartTotal FROM cart WHERE cartID = ?";
    db.query(cartTotalQuery, [cartID], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0].cartTotal);
      }
    });
  },

  getDeliveryChargeByType: (option, callback) => {
    const deliveryQuery = `SELECT deliveryID, deliveryCharge FROM delivery WHERE deliveryType = ?`;
    db.query(deliveryQuery, [option], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        callback(err, null);
      } else {
        console.log("Query parameter:", option); // Log the input parameter
        console.log("Query result:", result); // Log the query result
        // Ensure compatibility with different database drivers
        if (result && result.length > 0) {
          const { deliveryID, deliveryCharge } = result[0];
          callback(null, { deliveryID, deliveryCharge });
        } else {
          callback(null, null); // No matching delivery type found
        }
      }
    });
  },

  createPayment: (paymentData, callback) => {
    db.query('INSERT INTO payment SET ?', paymentData, (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, { insertId: results.insertId });
    });
  },

  generateOrderID: (callback) => {
    db.query("SELECT MAX(orderID) + 1 AS newOrderID FROM orders", callback);
  },

  createOrder: (orderData, callback) => {
    db.query("INSERT INTO orders SET ?", orderData, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, { insertId: results.insertId }); // Include the inserted ID in the response
      }
    });
  },
  
  createOrderDetails: (orderDetails, callback) => {
    db.query(
      "INSERT INTO orderdetails (orderID, proStockBatchID, quantity) VALUES ?",
      [
        orderDetails.map((detail) => [
          detail.orderID,
          detail.proStockBatchID,
          detail.quantity,
        ]),
      ],
      callback
    );
  },

  clearCart: (cartId, callback) => {
    db.query(`DELETE 
    FROM cartitem 
    WHERE cartID = ?`, [cartId], callback);
  },

};

module.exports = CheckoutModel;
