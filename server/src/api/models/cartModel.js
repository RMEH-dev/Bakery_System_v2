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
    const heldUntil = new Date(Date.now() + 60 * 60 * 1000);

    db.query(
      `INSERT INTO cartitem (cartID, proStockBatchID, quantity, heldUntil) 
      VALUES (?, ?, 1, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + 1`,

      [cartID, proStockBatchID, heldUntil],
      (err, results) => {
        if (err) {
          console.error("Error adding item to cart:", err);
        }
        callback(err, results);
      }
    );
  },

  getCartItemsByUserID: (values, callback) => {
    const sqlGetItemsByUserID = `SELECT ci.cartItemID, c.cartID, pb.proStockBatchID, ci.quantity, pb.quantity AS availableQuantity, p.proStockID, p.proStockName, p.pricePerItem, p.imageUrl 
    FROM cartitem ci 
    JOIN cart c ON ci.cartID = c.cartID 
    JOIN proStockBatch pb ON ci.proStockBatchID = pb.proStockBatchID 
    JOIN proStock p ON p.proStockID = pb.proStockID 
    WHERE c.userID = ?`;
    db.query(sqlGetItemsByUserID, values, callback);
  },

  getCartItemCountByUserID: (values, callback) => {
    const sqlGetItemCountByUserID = `SELECT COUNT(*) AS itemCount 
    FROM cartitem ci 
    JOIN cart c ON ci.cartID = c.cartID 
    WHERE c.userID = ?`;
    db.query(sqlGetItemCountByUserID, values, callback);
  },

  removeItemFromCart: (cartItemID, callback) => {
    const sqlRemoveItem = `DELETE FROM cartitem WHERE cartItemID = ?`;
    db.query(sqlRemoveItem, [cartItemID], callback);
  },

  updateItemQuantity: (cartItemID, newQuantity, callback) => {
    const sqlUpdateQuantity = `UPDATE cartitem SET quantity = ? WHERE cartItemID = ?`;
    db.query(sqlUpdateQuantity, [newQuantity, cartItemID], callback);
  },

  increaseStock: (proStockBatchID, quantity, callback) => {
    const sqlIncreaseStock = `UPDATE proStockBatch SET quantity = quantity + ? WHERE proStockBatchID = ?`;
    db.query(sqlIncreaseStock, [quantity, proStockBatchID], callback);
  },

  adjustStock: (proStockBatchID, adjustment, callback) => {
    const sqlAdjustStock = `UPDATE proStockBatch SET quantity = quantity + ? WHERE proStockBatchID = ?`;
    db.query(sqlAdjustStock, [adjustment, proStockBatchID], callback);
 
  }
};

module.exports = CartModel;
