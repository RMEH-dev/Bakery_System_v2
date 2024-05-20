const generateRawStockID = require("../helpers/generateRawStockID");
const {
  insertRawStock,
  getEditRawStock,
  updateRawStock,
} = require("../models/rawStockModel");
const { rawStock } = require("../models/rawStockModel");
const { insertRawItemDetails } = require("../models/rawItemDetailsModel");
const db = require("../../config/databaseConnection");
const { insertRawStockUsageTable } = require("../models/rawStockModel");

// Define a route to fetch raw stock data
exports.rawStock = (req, res) => {
  rawStock((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

// Route to handle adding raw inventory

exports.addRawStock = (req, res) => {
  const {
    rawStockName,
    manufactureDate,
    expirationDate,
    category,
    packageAmount,
    proStockName,
    proStockID,
    quantity,
    supplier,
  } = req.body;

  generateRawStockID((err, newRawStockID) => {
    if (err) {
      console.error("Error generating new rawStockID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const valuesRawStock = [
      newRawStockID,
      rawStockName,
      quantity,
      proStockID,
      manufactureDate,
      expirationDate,
    ];

    insertRawStock(valuesRawStock, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL (rawstock):", err);
        return res.status(500).json({ error: "Database error" });
      }

      const valuesRawItemDetails = [
        newRawStockID,
        category,
        packageAmount,
        supplier,
      ];

      insertRawItemDetails(valuesRawItemDetails, (err, result) => {
        if (err) {
          console.error(
            "Error inserting data into MySQL (rawitemdetails):",
            err
          );
          return res.status(500).json({ error: "Database error" });
        }

        res
          .status(200)
          .json({
            message: "Raw stock added successfully",
            rawStockID: newRawStockID,
          });
      });
    });
  });
};

//fetching the raw stock using rawStockID
exports.getRawStock = (req, res) => {
  const id = req.params.id;

  getEditRawStock(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Raw Stock Not Found" });
    }
    res.json(results[0]);
  });
  // res.json(rawStock);
};

//Updating the raw stock using rawStockID
exports.updateRawStock = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const {
    rawStockName,
    manufactureDate,
    expirationDate,
    quantity,
    supplier,
    category,
    packageAmount,
  } = updatedData;

  const sqlUpdateRawStock = `
    UPDATE rawStock r
    JOIN rawitemdetails i ON r.rawStockID = i.rawStockID
    SET 
      r.rawStockName = ?, 
      r.rawManuDate = ?, 
      r.rawExpDate = ?, 
      r.rawStockQuantity = ?, 
      i.supplier = ?, 
      i.category = ?, 
      i.packageAmount = ?
    WHERE r.rawStockID = ?;
  `;

  db.query(
    sqlUpdateRawStock,
    [
      rawStockName,
      manufactureDate,
      expirationDate,
      quantity,
      supplier,
      category,
      packageAmount,
      id,
    ],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({
            error: "An error occurred while updating the raw stock data.",
          });
      }
      res.json({ message: "Raw stock data updated successfully." });
    }
  );
};
