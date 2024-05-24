const db = require("../../config/databaseConnection");

const generateRawStockBatchIDAsync = (newRawStockID) => {
  const sqlGetHighestRawStockBatchID = `
      SELECT rawStockBatchID
      FROM rawstockbatch
      WHERE rawStockID = ? 
      ORDER BY rawStockBatchID DESC 
      LIMIT 1
    `;
  return new Promise((resolve, reject) => {
    db.query(sqlGetHighestRawStockBatchID, [newRawStockID], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length === 0) {
        const newBatchNo = `${newRawStockID}B1`;
        resolve(newBatchNo);
      } else {
        const highestBatchNo = result[0].rawStockBatchID;
        const batchNumberPart = parseInt(highestBatchNo.split("B")[1], 10) + 1;
        const newBatchNo = `${newRawStockID}B${String(batchNumberPart).padStart(
          4,
          "0"
        )}`;
        resolve(newBatchNo);
      }
    });
  });
};

module.exports = generateRawStockBatchIDAsync;
