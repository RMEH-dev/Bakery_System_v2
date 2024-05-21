const db = require("../../config/databaseConnection");

const generateProBatchNo = (proStockID, callback) => {
  const sqlGetHighestBatchNo = `
    SELECT proStockBatchID
    FROM prostockbatch
    WHERE proStockID = ? 
    ORDER BY proStockBatchID DESC 
    LIMIT 1`;

  db.query(sqlGetHighestBatchNo, [proStockID], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    if (result.length === 0) {
      const newBatchNo = `${proStockID}B1`;
      return callback(null, newBatchNo);
    } else {
      const highestBatchNo = result[0].proStockBatchID;
      const batchNumberPart = parseInt(highestBatchNo.split('B')[1], 10) + 1;
      const newBatchNo = `${proStockID}B${String(batchNumberPart).padStart(4, '0')}`;
      return callback(null, newBatchNo);
    }
  });
};

module.exports = generateProBatchNo;
