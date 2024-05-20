const {
  getRawStockUsage,
  editRawStockUsage,
  getRawStockNameUsage,
  getRawStockIDUsage,
  getProStockNameUsage,
  getProStockIDUsage,
  addRawStockUsage,
  updateRawStockUsage,
} = require("../models/rawStockUsageModel");
const db = require("../../config/databaseConnection");

exports.getRawStockUsage = (req,res) =>{
  getRawStockUsage([], (error, results) => {
    if (error) {
      console.error(
        "Error fetching ProStock details from the database:",
        error
      );
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};


exports.editRawStockUsage = (req, res) => {
  const { id } = req.params;
  editRawStockUsage(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Produced Stock Not Found" });
    }
    res.json(results[0]);
  });
  // res.json(rawStock);
};

exports.getRawStockNameUsage = (req, res) => {
  getRawStockNameUsage((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getProStockNameUsage = (req, res) => {
  getProStockNameUsage((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getProStockIDUsage = (req, res) => {
  const proStockName = req.query.proStockName;
  getProStockIDUsage(proStockName, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getRawStockIDUsage = (req, res) => {
  const rawStockName = req.query.rawStockName;
  getRawStockIDUsage(rawStockName, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.addRawStockUsage = (req, res) => {
  const {
    thresholdQuantity,
    rawStockID,
    proStockID,
  } = req.body;

  const valuesRawStockUsage = [
    rawStockID,
    proStockID,
    thresholdQuantity,
  ];

  addRawStockUsage(valuesRawStockUsage, (err) => {
    if (err) {
      console.error("Error inserting data into MySQL (rawstockusage):", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      message: "Produced stock added successfully",
    });
  });
};

exports.updateRawStockUsage = (req, res) => {
  const {id} = req.params;
  const { thresholdQuantity } = req.body;

  if (thresholdQuantity === undefined) {
    return res.status(400).json({ error: "Threshold Quantity is required" });
  }

  updateRawStockUsage(id, { thresholdQuantity }, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Raw Stock Usage Not Found" });
    }
    res.json({ message: "Threshold Quantity updated successfully" });
  });
};
