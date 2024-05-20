const db = require("../../config/databaseConnection");

const generateProStockID = (callback) => {
  const sqlGetHighestID = "SELECT proStockID FROM producedstock ORDER BY proStockID DESC LIMIT 1";

  db.query(sqlGetHighestID, (err, result) => {
    if (err) {
      return callback(err, null);
    }

    if (result.length === 0) {
      return callback(null, 'PS001');
    } else {
      const highestID = result[0].proStockID;
      const numericPart = parseInt(highestID.substring(2), 10) + 1;
      const newID = 'PS' + String(numericPart).padStart(3, '0');
      return callback(null, newID);
    }
  });
};

module.exports = generateProStockID;