const db = require("../../config/databaseConnection");

const generateOrderID = () => {
    const sqlGetHighestID = "SELECT orderID FROM orders ORDER BY orderID DESC LIMIT 1";
    return new Promise((resolve, reject) => {
    db.query(sqlGetHighestID, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length === 0) {
        resolve('OR001');
      } else {
        const highestID = result[0].orderID;
        const numericPart = parseInt(highestID.substring(2)) + 1;
        const newID = 'OR' + String(numericPart).padStart(3, '0');
        resolve(newID);
      }
    });
  });
};

module.exports = generateOrderID;
