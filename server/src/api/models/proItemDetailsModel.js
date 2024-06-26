const db = require("../../config/databaseConnection");

const insertProStockBatch= (values, callback) => {
  const sqlInsertProStockBatch = 'INSERT INTO prostockbatch (proStockBatchID, proStockID, quantity, thresholdQuantity, manuDate, expDate, branchID) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sqlInsertProStockBatch, values, callback);
};

module.exports = { insertProStockBatch };
