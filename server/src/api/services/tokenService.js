const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./.env" });

// Function to generate JWT token
exports.generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};