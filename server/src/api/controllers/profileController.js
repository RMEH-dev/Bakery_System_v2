const { getProfileInfo, updateUserProfile, getOrders, getAddress, addAddress, updateAddress } = require('../models/profileModel');
const bcrypt = require('bcrypt');


exports.getProfileInfo = (req, res) => {
    const { userId } = req.params;

    console.log('Fetching user with ID:', userId);
    getProfileInfo(userId, (error, results) => {
        if (error) {
            console.error("Error fetching user details from the database: ", error);
            return res.status(500).json({ error: "Database query error" });
        }
        if (results.length > 0) {
            console.log("User found:", results[0]);
            res.json(results[0]); // Return the first user object
        } else {
            console.log("User not found with ID:", userId);
            res.status(404).json({ error: "User not found" });
        }
    });
};

exports.updateUserProfile = (req, res) => {
  const { userID, firstName, lastName, userName, contact, currentPassword, newPassword } = req.body;

  // Validate input fields
  if (!userID) {
      return res.status(400).json({ error: "UserID is required" });
  }

  const fieldsToUpdate = {};
  if (firstName) fieldsToUpdate.firstName = firstName;
  if (lastName) fieldsToUpdate.lastName = lastName;
  if (userName) fieldsToUpdate.userName = userName;
  if (contact) fieldsToUpdate.contact = contact;

  // If no password change is required, update profile without checking existing password
  if (!currentPassword && !newPassword) {
      updateUserProfile(userID, fieldsToUpdate, (error, results) => {
          if (error) {
              console.error("Error updating user profile:", error);
              return res.status(500).json({ error: "Database update error" });
          }
          res.json({ message: "User profile updated successfully" });
      });
      return;
  }

  // Fetch user to compare existing password
  getProfileInfo(userID, (error, results) => {
      if (error) {
          console.error("Error fetching user details from the database:", error);
          return res.status(500).json({ error: "Database query error" });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];

      // Compare current password if provided
      bcrypt.compare(currentPassword, user.password, (error, isMatch) => {
          if (error) {
              console.error("Error comparing passwords:", error);
              return res.status(500).json({ error: "Password comparison error" });
          }

          if (!isMatch) {
              return res.status(401).json({ error: "current password is incorrect" });
          }

          // If a new password is provided, hash it and add to fieldsToUpdate
          if (newPassword) {
              bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
                  if (error) {
                      console.error("Error hashing new password:", error);
                      return res.status(500).json({ error: "Password hashing error" });
                  }

                  fieldsToUpdate.password = hashedPassword;
                  updateUserProfile(userID, fieldsToUpdate, (error, results) => {
                      if (error) {
                          console.error("Error updating user profile:", error);
                          return res.status(500).json({ error: "Database update error" });
                      }
                      res.json({ message: "User profile updated successfully" });
                  });
              });
          }
      });
  });
};

exports.userOrders = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    console.log(userId);
    getOrders(userId, [], (error, results) => {
      if (error) {
        console.error("Error fetching order details from the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
};


// Get address details for a user
exports.getAddress = (req,res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    console.log(userId);
    getAddress(userId, (error, results) => {
      if (error) {
        console.error("Error fetching order details from the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
};

// Add a new address for a user
exports.addAddress = (req, res) => {
    const { userId, street, city, postCode } = req.body;

    if (!userId || !street || !city || !postCode) {
        return res.status(400).json({ error: "All fields are required" });
    }

    addAddress(userId, street, city, postCode, (error, results) => {
        if (error) {
            console.error("Error adding address to the database:", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.status(201).json({ message: "Address added successfully", addressId: results.insertId });
    });
};

// Update an existing address for a user
exports.updateAddress = (req, res) => {
    const { userId, street, city, postCode } = req.body;

    if (!userId || !street || !city || !postCode) {
        return res.status(400).json({ error: "All fields are required" });
    }

    updateAddress(userId, street, city, postCode, (error, results) => {
        if (error) {
            console.error("Error updating address in the database:", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json({ message: "Address updated successfully" });
    });
}
