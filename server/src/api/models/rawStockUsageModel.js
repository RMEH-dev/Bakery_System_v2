const db = require("../../config/databaseConnection");

const getRawStockUsage = (values, callback) => {
  const sqlGetRawStockDetails = `SELECT r.rawStockName, ru.rawStockID, ru.usageID, p.proStockName, ru.proStockID, ru.thresholdQuantity
  FROM rawstockusage ru
  JOIN producedstock p ON ru.proStockID = p.proStockID
  JOIN rawstock r ON ru.rawStockID = r.rawStockID`;
  db.query(sqlGetRawStockDetails, values, callback);
};


const editRawStockUsage = (id, callback) => {
    const sqlGetRawStockUsage = ` SELECT ru.usageID, r.rawStockName, ru.rawStockID, p.proStockName, ru.proStockID, ru.thresholdQuantity
    FROM rawstockusage ru
    JOIN producedstock p ON ru.proStockID = p.proStockID
    JOIN rawstock r ON ru.rawStockID = r.rawStockID
    WHERE ru.usageID = ?`;
    db.query(sqlGetRawStockUsage, [id], callback);
  };

  const getRawStockNameUsage = (callback) => {
    const sqlGetRawStockNameUsage = "SELECT rawStockName FROM rawstock";
    db.query(sqlGetRawStockNameUsage, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  

  const getProStockNameUsage = (callback) => {
    const sqlGetProducedStockNameUsage = "SELECT proStockName FROM producedstock";
    db.query(sqlGetProducedStockNameUsage, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  const getRawStockIDUsage = (rawStockName, callback) => {
    const sqlGetRawStockIDUsage =
      "SELECT rawStockID FROM rawstock WHERE rawStockName = ?";
    db.query(sqlGetRawStockIDUsage, [rawStockName], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };

  const getProStockIDUsage = (proStockName, callback) => {
    const sqlGetProducedStockIDUsage =
      "SELECT proStockID FROM producedstock WHERE proStockName = ?";
    db.query(sqlGetProducedStockIDUsage, [proStockName], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  const addRawStockUsage = (values, callback) => {
    const sqlAddRawStockUsage =
      "INSERT INTO rawstockusage (rawStockID, proStockID, thresholdQuantity) VALUES (?, ?, ?)";
    db.query(sqlAddRawStockUsage, values, callback);
  };

  const updateRawStockUsage = (id, data, callback) => {
    const sqlUpdateRawStockUsage = `
      UPDATE rawstockusage
      SET thresholdQuantity = ?
      WHERE usageID = ?`;
  
    db.query(sqlUpdateRawStockUsage, [data.thresholdQuantity, id], callback);
  };
  

  module.exports = { getRawStockUsage, editRawStockUsage, getRawStockNameUsage, getProStockNameUsage, getRawStockIDUsage, getProStockIDUsage, addRawStockUsage, updateRawStockUsage};