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
  const sqlEditUsers = ` SELECT u.firstName, u.lastName, u.userName, u.email, u.contact, u.password, ut.userType, b.branchName
    FROM user u
    JOIN userroles ur ON ur.userID = u.userID
    JOIN usertypes ut ON ur.userTypeID = ut.userTypeID
    JOIN branch b ON ur.branchID = b.branchID
    WHERE u.userID = ?`;
  db.query(sqlEditUsers, [id], callback);
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

const updateUser = (updatedData, callback) => {
  try {
    const sqlUpdateUser = `
      UPDATE user 
      SET
      firstName = ?, 
      lastName = ?, 
      userName = ?, 
      email = ?, 
      contact = ?
      WHERE userID = ?`;

    db.query(sqlUpdateUser, updatedData, (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return callback(err, null);
      }

      const [
        firstName,
        lastName,
        userName,
        email,
        contact,
        userType,
        branchName,
        userID,
      ] = updatedData;

      // Get userTypeID
      const sqlGetUserTypeID = `
        SELECT userTypeID FROM usertypes WHERE userType = ?`;

      db.query(sqlGetUserTypeID, [userType], (err, [userTypeRow]) => {
        if (err) {
          console.error("Error getting userTypeID:", err);
          return callback(err, null);
        }
        const userTypeID = userTypeRow.userTypeID;

        // Get branchID
        const sqlGetBranchID = `
         SELECT branchID FROM branch WHERE branchName = ?`;

        db.query(sqlGetBranchID, [branchName], (err, [branchRow]) => {
          if (err) {
            console.error("Error getting branchID:", err);
            return callback(err, null);
          }
          const branchID = branchRow.branchID;

          // Update userroles table
          const sqlUpdateUserRoles = `
        UPDATE userroles 
        SET userTypeID = ?, branchID = ?
        WHERE userID = ?`;

          db.query(
            sqlUpdateUserRoles,
            [userTypeID, branchID, userID],
            (err, result) => {
              if (err) {
                console.error("Error updating user roles:", err);
                return callback(err, null);
              }
              callback(null, result);
            }
          );
        });
      });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    callback(error, null);
  }
};

const deleteUser = (userID, callback) => {
    // SQL to check userTypeID
    const checkUserTypeIDSQL = `SELECT userTypeID FROM userroles WHERE userID = ?`;

    // SQL to delete from userroles table
    const deleteUserRolesSQL = `DELETE FROM userroles WHERE userID = ?`;

    // SQL to delete from user table
    const deleteUserSQL = `DELETE FROM user WHERE userID = ?`;

    // Begin transaction
    db.beginTransaction(err => {
        if (err) {
            return callback(err);
        }

        // Check userTypeID
        db.query(checkUserTypeIDSQL, userID, (error, [userRoleRow]) => {
            if (error) {
                return db.rollback(() => {
                    callback(error, null);
                });
            }

            // Check if userTypeID is 1 or 2
            if (userRoleRow && (userRoleRow.userTypeID === 1 || userRoleRow.userTypeID === 3)) {
                return callback({ message: 'Deletion not allowed for this user type' }, null);
            }

            // Delete from userroles table
            db.query(deleteUserRolesSQL, userID, (error, results) => {
                if (error) {
                    return db.rollback(() => {
                        callback(error, null);
                    });
                }

                // Delete from user table
                db.query(deleteUserSQL, userID, (error, results) => {
                    if (error) {
                        return db.rollback(() => {
                            callback(error, null);
                        });
                    }

                    // Commit transaction
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                callback(err, null);
                            });
                        }
                        callback(null, results);
                    });
                });
            });
        });
    });
};

module.exports = {
  getUsers,
  editUsers,
  addUser,
  getUserTypes,
  getBranchName,
  updateUser,
  deleteUser
};
