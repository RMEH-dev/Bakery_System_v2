const db = require("../../config/databaseConnection");

const getProfileInfo = (userId, callback) => {
  const sqlProfileInfo = `
        SELECT u.userID, u.firstName, u.lastName, u.userName, u.email, u.contact, u.password, ut.userType 
        FROM user u
        JOIN userroles ur ON u.userID = ur.userID
        JOIN usertypes ut ON ur.userTypeID = ut.userTypeID
        WHERE u.userID = ?
    `;

  db.query(sqlProfileInfo, [userId], callback);
};

const updateUserProfile = (userID, fieldsToUpdate, callback) => {
  const setClause = Object.keys(fieldsToUpdate)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = [...Object.values(fieldsToUpdate), userID];

  const sqlUpdateUserProfile = `UPDATE user SET ${setClause} WHERE userID = ?`;

  db.query(sqlUpdateUserProfile, values, (error, results) => {
    if (error) {
      console.error("Error updating user profile:", error);
      return callback(error);
    }
    console.log("User profile updated successfully:", results);
    callback(null, results);
  });
};

const getOrders = (userId, values, callback) => {
  const sqlOrders = `SELECT u.firstName, o.orderID, o.orderType, DATE_FORMAT(o.orderDate, '%Y-%m-%d') AS orderDate, o.orderStatus, o.totalAmount, p.paymentType, p.paymentStatus, d.deliveryType, u.contact, a.street, a.city
    FROM user u
    JOIN orders o ON u.userID = o.userID
    JOIN payment p ON p.paymentID = o.paymentID
    JOIN delivery d ON d.deliveryID = o.deliveryID
    JOIN addresses a ON a.addressID = o.addressID
    WHERE u.userID = ?`;
  db.query(sqlOrders, [userId], callback);
};

const getAddress = (userId, callback) => {
    const sqlGetAddress = `
    SELECT a.addressID, a.street, a.city, a.postCode
    FROM addresses a
    JOIN user u ON a.userID = u.userID
    WHERE u.userID = ?
    `;
    db.query(sqlGetAddress, [userId], callback);
}

const addAddress = (userId, street, city, postCode, callback) => {
    const sqlAddAddress = `
    INSERT INTO addresses (userID, street, city, postCode)
    VALUES (?, ?, ?, ?)
    `;
    db.query(sqlAddAddress, [userId, street, city, postCode], callback);
}

const updateAddress = (userId, street, city, postCode, callback) => {
    const sqlUpdateAddress = `
    UPDATE addresses
    SET street = ?, city = ?, postCode = ?
    WHERE userID = ?
    `;
    db.query(sqlUpdateAddress, [street, city, postCode, userId], callback);
}

module.exports = { getProfileInfo, updateUserProfile, getOrders, getAddress, addAddress, updateAddress };
