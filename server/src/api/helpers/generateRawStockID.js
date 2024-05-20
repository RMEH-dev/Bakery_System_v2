const db = require("../../config/databaseConnection");

const generateRawStockID = (callback) => {
  const sqlGetHighestID = "SELECT rawStockID FROM rawstock ORDER BY rawStockID DESC LIMIT 1";

  db.query(sqlGetHighestID, (err, result) => {
    if (err) {
      return callback(err, null);
    }

    if (result.length === 0) {
      return callback(null, 'RS001');
    } else {
      const highestID = result[0].rawStockID;
      const numericPart = parseInt(highestID.substring(2)) + 1;
      const newID = 'RS' + String(numericPart).padStart(3, '0');
      return callback(null, newID);
    }
  });
};

module.exports = generateRawStockID;
