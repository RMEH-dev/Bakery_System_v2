const db = require("../../config/databaseConnection");

const insertProItemDetails = (values, callback) => {
  const sqlInsertProItemDetails1 = 'INSERT INTO proitemdetails (proStockID, proBatchNo, category, subCategory, pricePerItem) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlInsertProItemDetails1, values, callback);
};

module.exports = { insertProItemDetails };
