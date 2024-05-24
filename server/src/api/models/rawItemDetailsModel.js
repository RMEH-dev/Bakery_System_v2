const db = require("../../config/databaseConnection");

const insertRawStockBatchAsync = (values) => {
  const sqlInsertRawStockBatch = `
    INSERT INTO rawstockbatch (rawStockBatchID, rawStockID, quantity, branchID)
    VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sqlInsertRawStockBatch, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { insertRawStockBatchAsync };
