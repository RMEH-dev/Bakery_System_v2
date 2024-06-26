const db = require("../../config/databaseConnection");


const createUser = ( user, callback) => {
  const {
    userID,
    firstName,
    lastName,
    userName,
    email,
    contact,
    password,
  } = user;

  const sqlCreateUser = `INSERT INTO user (userID, firstName, lastName, userName, email, contact, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sqlCreateUser,
    [
      userID,
      firstName,
      lastName,
      userName,
      email,
      contact,
      password
    ],
    callback
  );
};


const createUserRole = (userID, userTypeID, branchID, callback) => {
  const sqlCreateUserRole = `INSERT INTO userroles (userID, userTypeID, branchID)
                              VALUES (?, ?, ?)`;
  db.query(sqlCreateUserRole, [userID, userTypeID, branchID], callback);
};


const findUserByEmailOrContact = (email, contact, callback) => {
  const query = `SELECT * FROM user WHERE email = ? OR contact = ?`;
  db.query(query, [email, contact], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = `
    SELECT u.userID, u.email, u.password, ur.userTypeID, ut.userType, ur.branchID
    FROM user u 
    JOIN userroles ur ON u.userID = ur.userID 
    JOIN usertypes ut ON ur.userTypeID = ut.userTypeID
    WHERE u.email = ?
  `;
  db.query(sql, [email], callback);
};


const getCurrentUser = (userId, callback) => {
 const dqlGetCurrentUser = `
 SELECT u.firstName, u.lastName, u.userName, u.email, u.contact, ur.userTypeID, ut.userType, ur.branchID
 FROM user u
 JOIN userroles ur ON u.userID = ur.userID
 JOIN usertypes ut ON ur.userTypeID = ut.userTypeID
 WHERE u.userID =?
 `;
 db.query(dqlGetCurrentUser, [userId], callback);
}


module.exports = {
  getUserByEmail,
  findUserByEmailOrContact,
  createUser,
  createUserRole,
  getCurrentUser
};
