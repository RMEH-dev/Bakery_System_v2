const {
  getUsers,
  editUsers,
  addUser,
  getUserTypes,
  getBranchName,
  updateUser,
} = require("../models/usersModel");
const { generateUserID } = require("../helpers/generateUserID");
const db = require("../../config/databaseConnection");
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
  getUsers([], (error, results) => {
    if (error) {
      console.error("Error fetching user details from the database:", error);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.editUsers = (req, res) => {
  const { id } = req.params;
  editUsers(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json(results[0]);
  });
  // res.json(rawStock);
};

exports.getUserTypes = (req, res) => {
  getUserTypes([], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getBranchName = (req, res) => {
  getBranchName([], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

//   exports.getRawStockIDUsage = (req, res) => {
//     const rawStockName = req.query.rawStockName;
//     getRawStockIDUsage(rawStockName, (error, results) => {
//       if (error) {
//         return res.status(500).json({ error: "Database query error" });
//       }
//       res.json(results);
//     });
//   };


exports.addUser = async (req, res) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      contact,
      password,
      userType,
      branchName,
    } = req.body;
  
    console.log(req.body);
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !contact ||
      !password ||
      !userType ||
      !branchName
    ) {
        console.log(req.body);
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userID = generateUserID(); // Generate a unique userID
  
      const userData = [
        userID,
        firstName,
        lastName,
        userName,
        email,
        contact,
        hashedPassword,
      ];
  
      addUser(userData, userType, branchName, (err, results) => {
        if (err) {
          console.error("Error inserting data", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({
          message: "User added successfully", userID
        });
        console.log(results);
      });
    } catch (error) {
      console.error("Error hashing password or adding user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



exports.updateUser = (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    userName,
    email,
    contact,
    password,
    userType,
    branchName,
  } = req.body;

  if (
    (!firstName || !lastName || !userName || !email,
    !contact || !password || !userType || !branchName)
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updatedData = [
    firstName,
    lastName,
    userName,
    email,
    contact,
    password,
    userType,
    branchName,
    id,
  ];

  console.log("Update Data:", updatedData);
  console.log(id);
  updateUser(updatedData, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json({ message: `User ${id} updated successfully` });
  });
};
