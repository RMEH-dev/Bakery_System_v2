const cron = require("node-cron");
const db = require("../../config/databaseConnection");
const CartModel = require("../models/cartModel");

const returnExpiredHoldsToStock = () => {
  const sqlFindExpiredItems = `SELECT * FROM cartItem WHERE heldUntil < NOW()`;
  db.query(sqlFindExpiredItems, (err, results) => {
    if (err) {
      console.error("Error fetching expired cart items:", err);
      return;
    }
    results.forEach(item => {
      CartModel.adjustStock(item.proStockBatchID, item.quantity, (adjustErr) => {
        if (adjustErr) {
          console.error("Error adjusting stock for expired item:", adjustErr);
          return;
        }
        const sqlRemoveExpiredItem = `DELETE FROM cartItem WHERE cartItemID = ?`;
        db.query(sqlRemoveExpiredItem, [item.cartItemID], (deleteErr) => {
          if (deleteErr) {
            console.error("Error removing expired cart item:", deleteErr);
          }
        });
      });
    });
  });
};

// Schedule the job to run every minute
cron.schedule("* * * * *", returnExpiredHoldsToStock);

module.exports = {
    start: () => {
      returnExpiredHoldsToStock();
    },
  };