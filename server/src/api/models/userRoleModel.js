const db = require('../../config/databaseConnection');

const getUserRoleAndBranch = (userID, callback) => {
  const query = `
    SELECT ur.userID, ur.userTypeID, ur.branchID, ut.userType 
    FROM userroles ur 
    JOIN usertypes ut ON ur.userTypeID = ut.userTypeID 
    WHERE ur.userID = ?
  `;
  db.query(query, [userID], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getUserRoleAndBranch,
};
