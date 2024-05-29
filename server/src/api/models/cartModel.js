const db = require("../../config/databaseConnection");

const CartModel = {
  getCartByUserID: (userID, callback) => {
    db.query(
      "SELECT cartID FROM cart WHERE userID = ?",
      [userID],
      (err, results) => {
        if (err) {
          console.error("Error fetching cart by user ID:", err);
        }
        callback(err, results);
      }
    );
  },

  createCart: (userID, callback) => {
    db.query(
      "INSERT INTO cart (userID) VALUES (?)",
      [userID],
      (err, results) => {
        if (err) {
          console.error("Error creating new cart:", err);
        }
        callback(err, results);
      }
    );
  },

  addItemToCart: (cartID, proStockBatchID, callback) => {
    db.query(
      "INSERT INTO cartitem (cartID, proStockBatchID, quantity) VALUES (?, ?, 1)",
      [cartID, proStockBatchID],
      (err, results) => {
        if (err) {
          console.error("Error adding item to cart:", err);
        }
        callback(err, results);
      }
    );
  },

  getCartItemsByUserID: (userID, callback) => {
    const query = `
      SELECT
        ci.cartID,
        ci.proStockBatchID,
        ci.quantity,
        pb.proStockID,
        ps.proStockName,
        ps.pricePerItem
      FROM cartitem ci
      JOIN cart c ON ci.cartID = c.cartID
      JOIN proStockBatch psb ON ci.proStockBatchID = pb.proStockBatchID
      JOIN proStock ps ON pb.proStockID = ps.proStockID
      WHERE c.userID = ?
    `;
    db.query(query, [userID], (err, results) => {
      if (err) {
        console.error("Error fetching cart items:", err);
      }
      callback(err, results);
    });
  },
};

module.exports = CartModel;
