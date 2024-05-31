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

   getCartItemsByUserID: (values, callback) => {
    const sqlGetItemsByUserID = `SELECT ci.cartItemID, c.cartID, pb.proStockBatchID, ci.quantity, p.proStockID, p.proStockName, p.pricePerItem, p.imageUrl FROM cartitem ci JOIN cart c ON ci.cartID = c.cartID JOIN proStockBatch pb ON ci.proStockBatchID = pb.proStockBatchID JOIN proStock p ON p.proStockID = pb.proStockID WHERE c.userID = ?`;
    db.query(sqlGetItemsByUserID, values, callback);
},
 
};

module.exports = CartModel;
