const db = require("../../config/databaseConnection");


const createUser = (user, callback) => {
  const {
    userType,
    userID,
    firstName,
    lastName,
    userName,
    email,
    contact,
    password,
    confirmPassword,
  } = user;

  const sqlCreateUser = `INSERT INTO user (userType, userID, firstName, lastName, userName, email, contact, password, confirmPassword)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sqlCreateUser,
    [
      userType,
      userID,
      firstName,
      lastName,
      userName,
      email,
      contact,
      password,
      confirmPassword,
    ],
    callback
  );
};

const findUserByEmailOrContact = (email, contact, callback) => {
  const query = `SELECT * FROM user WHERE email = ? OR contact = ?`;
  db.query(query, [email, contact], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], callback);
};

module.exports = {
  getUserByEmail,
  findUserByEmailOrContact,
  createUser,
};
