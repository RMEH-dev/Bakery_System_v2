const db = require("../../config/databaseConnection");

const getBranches = (callback) => {
    const sqlGetBranches = "SELECT branchName, branchID , branchLocation FROM branch";
    db.query(sqlGetBranches, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };

module.exports = getBranches;