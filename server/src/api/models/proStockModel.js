const db = require("../../config/databaseConnection");

const insertProStock = (values, callback) => {
  const sqlInsertProStock =
    "INSERT INTO producedstock (proStockID, proStockName, proStockQuantity, proManuDate, proExpDate, availableFrom, availableTill) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sqlInsertProStock, values, callback);
};

const getProStockDetails = (values, callback) => {
  const sqlGetProItemDetails = `SELECT p.proStockName,  p.proStockQuantity, DATE_FORMAT(p.proManuDate, '%Y-%m-%d') AS proManuDate, DATE_FORMAT(p.proExpDate, '%Y-%m-%d') AS proExpDate, p.availableFrom, p.availableTill, i.proBatchNo, i.category, i.subCategory, i.pricePerItem FROM producedstock p JOIN proitemdetails i ON p.proStockID = i.proStockID`;
  db.query(sqlGetProItemDetails, values, callback);
};

// const checkExistingProStock = (proStockName, proStockID, callback) => {
//   const checkExistingProStock = "SELECT * FROM producedstock WHERE proStockName = ? OR proStockID = ?";
//   db.query(checkExistingProStock, [proStockName, proStockID], callback);
// };

const getProStockNames = (callback) => {
  const sqlGetProducedStockNames = "SELECT proStockName FROM producedstock";
  db.query(sqlGetProducedStockNames, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Fetch produced stock IDs based on a given produced stock name
const getProStockIDs = (proStockName, callback) => {
  const sqlGetProducedStockIDs =
    "SELECT proStockID FROM producedstock WHERE proStockName = ?";
  db.query(sqlGetProducedStockIDs, [proStockName], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getProStock = (id, callback) => {
  const sqlGetProStockDetails = `SELECT p.proStockName, DATE_FORMAT(p.proManuDate, '%Y-%m-%d') AS proManuDate , DATE_FORMAT(p.proExpDate, '%Y-%m-%d') AS proExpDate, i.category, i.subCategory, p.availableFrom, p.availableTill, i.pricePerItem,  p.proStockQuantity FROM producedstock p JOIN proitemdetails i ON p.proStockID = i.proStockID WHERE i.proBatchNo = ?`; 
  db.query(sqlGetProStockDetails, [id], callback);
};

const updateProStock = (updateData, callback) =>{
    const sqlUpdateProStock = `UPDATE producedstock p 
  JOIN proitemdetails i ON p.proStockID = i.proStockID
  SET 
    p.proStockQuantity =?,
    p.proStockName = ?,  
    p.proManuDate = ?, 
    p.proExpDate = ?,
    p.availableFrom = ?, 
    p.availableTill = ?, 
    i.category = ?, 
    i.subCategory = ?, 
    i.pricePerItem = ?
  WHERE i.proBatchNo = ?`;

  // const completeUpdateData = [...updateData, id]

  db.query(sqlUpdateProStock, updateData, callback)
};

module.exports = {
  getProStockDetails,
  insertProStock,
  getProStockNames,
  getProStockIDs,
  getProStock,
  updateProStock
};