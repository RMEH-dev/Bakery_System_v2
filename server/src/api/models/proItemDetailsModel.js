const db = require("../../config/databaseConnection");

const insertProStockBatch= (values, callback) => {
  const sqlInsertProStockBatch = 'INSERT INTO prostockbatch (proStockBatchID, quantity, manuDate, expDate) VALUES (?, ?, ?, ?)';
  db.query(sqlInsertProStockBatch, values, callback);
};

module.exports = { insertProStockBatch };
