const db = require("../../config/databaseConnection");

const getRawStockNames = (callback) => {
  const sqlGetRawStockNames = "SELECT rawStockName FROM rawstock";
  db.query(sqlGetRawStockNames, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getSupplier = (callback) => {
  const sqlSupplier =
    "SELECT DISTINCT s.supplierName FROM supplier s JOIN rawstock r WHERE s.supplierID = r.supplierID ";
  db.query(sqlSupplier, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getUnits = (callback) => {
  const sqlUnits = "SELECT DISTINCT units FROM rawstock";
  db.query(sqlUnits, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const getRawStockCategory = (callback) => {
  const sqlGetRawStockCategory = "SELECT DISTINCT category FROM rawstock";
  db.query(sqlGetRawStockCategory, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

const insertSupplierAsync = (values) => {
  return new Promise((resolve, reject) => {
    const sqlInsertSupplier = `
      INSERT INTO supplier (supplierName)
      VALUES (?)
    `;
    db.query(sqlInsertSupplier, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getSupplierIDAsync = (supplierName) => {
  return new Promise((resolve, reject) => {
    const sqlGetSupplierID =
      "SELECT supplierID FROM supplier WHERE supplierName = ?";
    db.query(sqlGetSupplierID, [supplierName], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const insertRawStockAsync = (values) => {
  const sqlInsertRawStock =
    "INSERT INTO rawstock  (rawStockID, rawStockName, category, proStockID, units, manuDate, expDate, branchID, supplierID) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sqlInsertRawStock, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const insertRawStockUsageTable = (values, callback) => {
  const sqlInsertRawStockUsage =
    "INSERT INTO rawstockusage (rawStockID) VALUES (?)";
  db.query(sqlInsertRawStockUsage, values, callback);
};

const rawStock = (values, callback) => {
  const sqlGetRawStockDetails = ` SELECT 
  r.rawStockName, 
  rb.rawStockBatchID, 
  pb.proStockBatchID, 
  DATE_FORMAT(r.manuDate, '%Y-%m-%d') AS manuDate, 
  DATE_FORMAT(r.expDate, '%Y-%m-%d') AS expDate, 
  rb.quantity, 
  s.supplierName, 
  r.category, 
  r.units, 
  p.proStockName 
FROM 
  rawstock r 
JOIN 
  rawStockBatch rb ON rb.rawStockID = r.rawStockID 
JOIN
  proStock p ON p.proStockID = r.proStockID
JOIN
  proStockBatch pb ON pb.proStockID = p.proStockID
JOIN
  supplier s ON s.supplierID = r.supplierID;`;

  db.query(sqlGetRawStockDetails, values, callback);
};

const getEditRawStock = (id, callback) => {
  const sqlGetRawStockDetails = `SELECT p.proStockName, p.proStockID, r.rawStockName, DATE_FORMAT(r.manuDate, '%Y-%m-%d') AS manuDate , DATE_FORMAT(r.expDate, '%Y-%m-%d') AS expDate, r.category, i.quantity, s.supplierName, r.units FROM rawstock r JOIN rawstockbatch i ON r.rawStockID = i.rawStockID JOIN supplier s ON r.supplierID = s.supplierID JOIN prostock p ON r.proStockID = p.proStockID WHERE i.rawStockBatchID = ?`;
  db.query(sqlGetRawStockDetails, [id], callback);
};

module.exports = {
  rawStock,
  getRawStockNames,
  getRawStockCategory, 
  getSupplier,
  getUnits,
  insertRawStockAsync,
  getEditRawStock,
  insertSupplierAsync,
  getSupplierIDAsync,
  insertRawStockUsageTable,
};
