const db = require("../../config/databaseConnection");

const insertRawItemDetails = (values, callback) => {
  const sqlInsertRawItemDetails = 'INSERT INTO rawitemdetails (rawStockID, category, packageAmount, supplier) VALUES (?, ?, ?, ?)';
  db.query(sqlInsertRawItemDetails, values, callback);
};

module.exports = { insertRawItemDetails };
