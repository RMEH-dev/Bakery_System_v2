const db = require('../../config/databaseConnection');

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