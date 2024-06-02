const db = require("../../config/databaseConnection");

const insertProStock = (values, callback) => {
  const sqlInsertProStock =
    "INSERT INTO prostock (proStockID, proStockName, category, subCategory, availableFrom, availableTill, pricePerItem, branchID, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sqlInsertProStock, values, callback);
};

const getProStockBatch = (values, callback) => {
  const sqlGetProStockBatch = `SELECT p.proStockName, i.quantity, i.thresholdQuantity, DATE_FORMAT(i.manuDate, '%Y-%m-%d') AS manuDate, DATE_FORMAT(i.expDate, '%Y-%m-%d') AS expDate, p.availableFrom, p.availableTill, i.proStockBatchID, p.category, p.subCategory, p.pricePerItem, b.branchName FROM prostock p JOIN prostockbatch i ON p.proStockID = i.proStockID JOIN branch b ON p.branchID = b.branchID`;
  db.query(sqlGetProStockBatch, values, callback);
};

// const checkExistingProStock = (proStockName, proStockID, callback) => {
//   const checkExistingProStock = "SELECT * FROM producedstock WHERE proStockName = ? OR proStockID = ?";
//   db.query(checkExistingProStock, [proStockName, proStockID], callback);
// };

const getProStockNames = (callback) => {
  const sqlGetProStockNames = "SELECT DISTINCT  proStockName FROM prostock";
  db.query(sqlGetProStockNames, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getProStockCategory = (callback) => {
  const sqlGetProStockCategory = "SELECT DISTINCT category FROM prostock";
  db.query(sqlGetProStockCategory, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};


const getProStockSubCategory = (callback) => {
  const sqlGetProStockSubCategory = "SELECT DISTINCT subCategory FROM prostock";
  db.query(sqlGetProStockSubCategory, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Fetch produced stock IDs based on a given produced stock name
const getProStockIDs = (proStockName, callback) => {
  const sqlGetProStockIDs =
    "SELECT proStockID FROM prostock WHERE proStockName = ?";
  db.query(sqlGetProStockIDs, [proStockName], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getProStock = (id, callback) => {
  const sqlGetProStock = `SELECT p.proStockName, DATE_FORMAT(i.manuDate, '%Y-%m-%d') AS manuDate , DATE_FORMAT(i.expDate, '%Y-%m-%d') AS expDate, p.category, p.subCategory, p.availableFrom, p.availableTill, p.pricePerItem,  i.quantity, p.imageUrl FROM prostock p JOIN prostockbatch i ON p.proStockID = i.proStockID WHERE i.proStockBatchID = ?`; 
  db.query(sqlGetProStock, [id], callback);
};

const updateProStockBatch = (updateData, callback) => {
  const sqlUpdateProStockBatch = `
    UPDATE prostock p
    JOIN prostockbatch pb ON p.proStockID = pb.proStockID
    SET 
      p.proStockName = ?,  
      p.pricePerItem = ?,
      p.category = ?, 
      p.subCategory = ?, 
      p.availableFrom = ?, 
      p.availableTill = ?,
      pb.quantity = ?,
      pb.manuDate = ?, 
      pb.expDate = ?,
      p.branchID = ?
    WHERE pb.proStockBatchID = ?`;

  db.query(sqlUpdateProStockBatch, updateData, (error, results) => {
    if (error) {
      console.error("SQL Error:", error);
    } else {
      console.log("SQL Results:", results);
    }
    callback(error, results);
  });
  console.log("SQL Batch Update Data:", updateData);
};







// const updateProStock = (updateData, callback) =>{
//     const sqlUpdateProStock = `UPDATE prostock p 
//   JOIN prostockbatch i ON p.proStockID = i.proStockID
//   SET 
//     p.proStockName = ?,  
//     p.pricePerItem = ?
//     i.manuDate = ?, 
//     i.expDate = ?,
//     i.quantity =?,
//     p.category = ?, 
//     p.subCategory = ?, 
//     p.availableFrom = ?, 
//     p.availableTill = ?, 
//     p.branchID= ?,
//     i.branchID= ?
//   WHERE i.proStockBatchID = ?`;

//   // const completeUpdateData = [...updateData, id]

//   db.query(sqlUpdateProStock, updateData, callback)
// };

module.exports = {
  getProStockBatch,
  insertProStock,
  getProStockNames,
  getProStockCategory,
  getProStockSubCategory,
  getProStockIDs,
  getProStock,
  updateProStockBatch
};