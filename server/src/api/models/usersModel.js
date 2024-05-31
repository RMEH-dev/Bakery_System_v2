const db = require("../../config/databaseConnection");

const getUsers = (values, callback) => {
  const sqlUsers= `SELECT u.firstName, u.userName, u.userID, ut.userType, b.branchName, u.contact, u.email 
  FROM user u
  JOIN userroles ur ON u.userID = ur.userID
  LEFT JOIN branch b ON ur.branchID = b.branchID
  JOIN usertypes ut ON ut.userTypeID = ur.userTypeID`;
  db.query(sqlUsers, values, callback);
};

const addUser = (addUser, callback) => {
 const sqlAddUser = `
 INSERT INTO user u (u.userID, u.firstName, u.lastName, u.userName, u.email, u.contact, u.password)
 VALUES (?,?,?,?,?,?,?)
 `;

 const sqlGetIds = `
 SELECT 
   (SELECT userTypeID FROM usertypes WHERE userType = ?) AS userTypeID, 
   (SELECT branchID FROM branch WHERE branchName = ?) AS branchID;
`;

const sqlAddUserRole = `
 INSERT INTO userroles (userID, userTypeID, branchID)
 VALUES (?, ?, ?);
`;

// Begin transaction
db.beginTransaction(err => {
    if (err) {
      return callback(err);
    }

    // Insert into user table
    db.query(sqlAddUser, userData, (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const userID = userData[0]; // Assuming userID is the first element in userData

      // Get userTypeID and branchID
      db.query(sqlGetIds, [userType, branchName], (err, idsResult) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        const { userTypeID, branchID } = idsResult[0];

        // Insert into userroles table
        db.query(sqlAddUserRole, [userID, userTypeID, branchID], (err, userRoleResult) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          // Commit transaction
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                callback(err);
              });
            }
            callback(null, { userResult: result, userRoleResult });
          });
        });
      });
    });
  });
};

const editUsers = (id, callback) => {
    const sqlGetRawStockUsage = ` SELECT ru.usageID, r.rawStockName, ru.rawStockID, p.proStockName, ru.proStockID, ru.thresholdQuantity
    FROM rawstockusage ru
    JOIN producedstock p ON ru.proStockID = p.proStockID
    JOIN rawstock r ON ru.rawStockID = r.rawStockID
    WHERE ru.usageID = ?`;
    db.query(sqlGetRawStockUsage, [id], callback);
  };
  
  const getUserTypes = (values, callback) => {
    const sqlGetUserTypes =
      "SELECT DISTINCT ut.userType FROM usertypes ut JOIN userroles ur ON ut.userTypeID = ur.userTypeID";
    db.query(sqlGetUserTypes, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };

  const getBranchName = (values, callback) => {
    const sqlGetBranchName =
      "SELECT DISTINCT b.branchName FROM branch b JOIN userroles ur ON ur.branchID = b.branchID";
    db.query(sqlGetBranchName, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };

  const updateUser = (id, data, callback) => {
    const sqlUpdateUsers = `
      UPDATE users
      SET
      thresholdQuantity = ?
      WHERE usageID = ?`;
  
    db.query(sqlUpdateUsers, [data.thresholdQuantity, id], callback);
  };
  

  module.exports = {  getUsers,
    editUsers,
    addUser,
    getUserTypes,
    getBranchName,
    updateUser };