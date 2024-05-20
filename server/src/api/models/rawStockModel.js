const db = require("../../config/databaseConnection");

const insertRawStock = (values, callback) => {
    const sqlInsertRawStock = 'INSERT INTO rawstock (rawStockID, rawStockName, rawStockQuantity, proStockID, rawManuDate, rawExpDate) VALUES (?, ?, ?, ? , ?, ?)';
    db.query(sqlInsertRawStock, values, callback);
  };

const insertRawStockUsageTable = (values, callback) => {
  const sqlInsertRawStockUsage = 'INSERT INTO rawstockusage (rawStockID) VALUES (?)';
  db.query(sqlInsertRawStockUsage, values, callback);
};  

const rawStock = (values, callback) => {
  const sqlGetRawStockDetails = ` SELECT r.rawStockName, 
  r.rawStockID, 
  r.proStockID, 
  DATE_FORMAT(r.rawManuDate, '%Y-%m-%d') AS rawManuDate, 
  DATE_FORMAT(r.rawExpDate, '%Y-%m-%d') AS rawExpDate, 
  r.rawStockQuantity, 
  i.supplier, 
  i.category, 
  i.packageAmount, 
  p.proStockName 
FROM 
  rawstock r 
JOIN 
  rawitemdetails i ON r.rawStockID = i.rawStockID 
JOIN 
  producedstock p ON p.proStockID = r.proStockID;`;
  db.query(sqlGetRawStockDetails, values, callback);
};

const getEditRawStock = (id, callback) => {
  const sqlGetRawStockDetails = `SELECT r.rawStockName, r.rawStockID, DATE_FORMAT(r.rawManuDate, '%Y-%m-%d') AS rawManuDate , DATE_FORMAT(r.rawExpDate, '%Y-%m-%d') AS rawExpDate, r.rawStockQuantity, r.proStockID, i.supplier, i.category, i.packageAmount FROM rawstock r JOIN rawitemdetails i ON r.rawStockID = i.rawStockID WHERE r.rawStockID = ?`;
  db.query(sqlGetRawStockDetails, [id], callback);
};



module.exports = { rawStock, insertRawStock, getEditRawStock, insertRawStockUsageTable };