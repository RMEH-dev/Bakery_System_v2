const db = require("../../config/databaseConnection");

const getUsers = (values, callback) => {
  const sqlUsers = `SELECT u.firstName, u.userName, u.userID, ut.userType, b.branchName, u.contact, u.email 
  FROM user u
  JOIN userroles ur ON u.userID = ur.userID
  LEFT JOIN branch b ON ur.branchID = b.branchID
  JOIN usertypes ut ON ut.userTypeID = ur.userTypeID`;
  db.query(sqlUsers, values, callback);
};

const addUser = async (userData, userType, branchName, callback) => {
  try {
    const sqlAddUser = `
        INSERT INTO user (userID, firstName, lastName, userName, email, contact, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.query(sqlAddUser, userData);

    //Get userTypeID
    const sqlGetUserTypeID = `
        SELECT userTypeID FROM usertypes WHERE userType =?`;

    db.query(sqlGetUserTypeID, [userType], (err, [userTypeRow]) => {
      if (err) {
        console.error("Error getting userTypeID:", err);
        return callback(err);
      }

      const userTypeID = userTypeRow.userTypeID;

      //Get BranchID
      const sqlGetBranchID = `
        SELECT branchID FROM branch WHERE branchName =?`;

      db.query(sqlGetBranchID, [branchName], (err, [branchRow]) => {
        if (err) {
          console.error("Error getting branchID:", err);
          return callback(err);
        }

        const branchID = branchRow.branchID;
        //Insert into userroles table
        const sqlAddUserRole = `
        INSERT INTO userroles (userID, userTypeID, branchID)
        VALUES (?, ?, ?)`;

        db.query(sqlAddUserRole, [userData[0], userTypeID, branchID]);
      });
    });
    callback(null, { userID: userData[0] });
  } catch (error) {
    console.error("Error adding user: ", error);
    callback(error, null);
  }
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

module.exports = {
  getUsers,
  editUsers,
  addUser,
  getUserTypes,
  getBranchName,
  updateUser,
};
