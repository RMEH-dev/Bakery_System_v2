const db = require("../../config/databaseConnection");

const generateRawStockIDAsync = () => {
    const sqlGetHighestID = "SELECT rawStockID FROM rawstock ORDER BY rawStockID DESC LIMIT 1";
    return new Promise((resolve, reject) => {
    db.query(sqlGetHighestID, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length === 0) {
        resolve('RS001');
      } else {
        const highestID = result[0].rawStockID;
        const numericPart = parseInt(highestID.substring(2)) + 1;
        const newID = 'RS' + String(numericPart).padStart(3, '0');
        resolve(newID);
      }
    });
  });
};

module.exports = generateRawStockIDAsync;
