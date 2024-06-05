const db = require("../../config/databaseConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  getNextUserId,
  getCurrentUser,
  createUser,
  createUserRole,
  findUserByEmailOrContact,
} = require("../models/authModel");
const jwtConfig = require("../../config/jwt");
const { generateUserID } = require("../../api/helpers/generateUserID");

//Logic to check whether the user already exists
exports.checkExistingUser = (req, res) => {
  const { email, contact } = req.body;

  findUserByEmailOrContact(email, contact, (err, results) => {
    if (err) {
      console.error("Error checking existing user:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json({ exists: results.length > 0 });
  });
};

// Register a new user with the specified email
exports.signUp = async (req, res) => {
  const { firstName, lastName, userName, email, contact, password } = req.body;

  try {
    findUserByEmailOrContact(email, contact, async (err, results) => {
      if (err) {
        console.error("Error checking existing user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // If user does not exist, hash password and create a new user
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userID = generateUserID(); // Generate a unique userID

      // Generate a new userID
      // db.query('CALL GetNextUserId(@nextUserID); SELECT @nextUserID AS nextID;', (err, rows) => {
      //   if (err) {
      //     console.error("Error generating userID:", err);
      //     return res.status(500).json({ message: "Internal server error" });
      //   }

        // const userID = rows[1][0].nextID; // Extract the next user ID from the stored procedure result

          const user = {
              userID,
              firstName,
              lastName,
              userName,
              email,
              contact,
              password: hashedPassword,
          };

          createUser(user, (err, results) => {
            if (err) {
              console.error("Error creating user:", err);
              return res.status(500).json({ message: "Internal server error" });
            }

            const userTypeID = 3; // Assuming 'Customer' is the default user type
            const branchID = null; // No branch assigned initially

            createUserRole(userID, userTypeID, branchID, (err, results) => {
              if (err) {
                console.error("Error assigning user role:", err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: jwtConfig.expiresIn,
              });
              res
                .status(201)
                .json({ message: "User created successfully", token });
            });
          });
      } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// User login functionality
exports.login = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        {
          id: user.userID,
          email: user.email,
          userType: user.userType,
          branchID: user.branchID, 
        },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );

      res.json({ token });
    });
  });
};


exports.getCurrentUser =(req, res) => {
  const { userId } = req.params;
  getCurrentUser(userId, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not Found" });
    }
    res.json(results[0]);
    console.log(results);
  });
};