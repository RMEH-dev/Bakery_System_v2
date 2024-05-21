const db = require('../../config/databaseConnection');
const {getUserRoleAndBranch} = require('../models/userRoleModel');

exports.updateUserRoleAndBranch = (req, res) => {
    const { userID, userTypeID, branchID } = req.body;

    if (!userID || !userType || !branchID) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sqlUpdate = `UPDATE userroles SET userTypeID = ?, branchID = ? WHERE userID = ?`;

    db.query(sqlUpdate, [userTypeID, branchID, userID], (err, results) => {
        if (err) {
            console.error("Error Updating user role and branch: ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User role and branch updated successfully" });
    })
}

const getUserRoleAndBranch = (req, res) => {
    const { userID } = req.user;
  
    getUserRoleAndBranch(userID, (error, results) => {
      if (error) {
        console.error('Error fetching user role and branch:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User role and branch not found' });
      }
  
      res.json(results);
    });
  };