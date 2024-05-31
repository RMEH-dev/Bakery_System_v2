const generateRawStockIDAsync = require("../helpers/generateRawStockID");
const {
  insertRawStockAsync,
  getOrCreateSupplierID,
  getEditRawStock,
  getRawStockNames,
  getRawStockCategory,
  getSupplier,
  insertSupplierAsync,
  getSupplierIDAsync,
  getUnits,
  updateRawStock,
} = require("../models/rawStockModel");
const { rawStock } = require("../models/rawStockModel");
const { insertRawStockBatchAsync } = require("../models/rawItemDetailsModel");
const db = require("../../config/databaseConnection");
const { insertRawStockUsageTable } = require("../models/rawStockModel");
const generateRawStockBatchIDAsync = require("../helpers/generateRawStockBatchID");

// Define a route to fetch raw stock data
exports.rawStock = (req, res) => {
  rawStock((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

//to get the raw stock related names
exports.getRawStockNames = (req, res) => {
  getRawStockNames((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getSupplier = (req, res) => {
  getSupplier((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getUnits = (req, res) => {
  getUnits((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getRawStockCategory = (req, res) => {
  getRawStockCategory((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};
exports.addRawStock = async (req, res) => {
  const {
    branchID,
    category,
    expirationDate,
    manufactureDate,
    proStockID,
    quantity,
    rawStockName,
    supplierName,
    units,
  } = req.body;

  try {
    // Generate new rawStockID
    const newRawStockID = await generateRawStockIDAsync();

    // Check if supplier exists, if not , insert it
    let supplierID;
    const existingSupplier = await getSupplierIDAsync(supplierName);

    if (existingSupplier.length === 0) {
      const supplierValues = [supplierName];
      const supplierResult = await insertSupplierAsync(supplierValues);
      supplierID = supplierResult.insertId;
    } else {
      supplierID = existingSupplier[0].supplierID;
    }

    // // Insert or get supplierID
    // const supplierID = await getOrCreateSupplierID(supplierName, newRawStockBatchID);

    // Insert data into rawstock table
    const valuesRawStock = [
      newRawStockID,
      rawStockName,
      category,
      proStockID,
      units,
      manufactureDate,
      expirationDate,
      branchID,
      supplierID,
    ];
    await insertRawStockAsync(valuesRawStock);

    // Generate new rawStockBatchID
    const newRawStockBatchID = await generateRawStockBatchIDAsync(
      newRawStockID
    );

    // Insert data into rawstockbatch table
    const valuesRawStockBatch = [
      newRawStockBatchID,
      newRawStockID,
      quantity,
      branchID,
    ];
    await insertRawStockBatchAsync(valuesRawStockBatch);

    // Update supplierID in rawstock table

    res.status(200).json({
      message: "Produced stock added successfully",
      rawStockID: newRawStockID,
      rawStockBatchID: newRawStockBatchID,
    });
  } catch (error) {
    console.error("Error adding raw stock:", error);
    res.status(500).json({ error: "Database error" });
  }
};

//fetching the raw stock using rawStockID
exports.getRawStock = (req, res) => {
  const { id } = req.params;
  console.log(id);
  getEditRawStock(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Raw Stock Not Found" });
    }
    res.json(results[0]);
    console.log(results);
  });
  // res.json(rawStock);
};

//Updating the raw stock using rawStockID
exports.updateRawStock = (req, res) => {
  const { id }  = req.params;
  const {
    proStockName,
    proStockID,
    rawStockName,
    manufactureDate,
    expirationDate,
    quantity,
    supplierName,
    category,
    units,
    branchID
  } = req.body;

  if (
    !proStockName ||
    !proStockID ||
    !rawStockName ||
    !manufactureDate ||
    !expirationDate ||
    !quantity ||
    !supplierName ||
    !category ||
    !units ||
    !branchID
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updatedData = [
    proStockName,
    proStockID,
    rawStockName,
    manufactureDate,
    expirationDate,
    quantity,
    supplierName,
    category,
    units,
    branchID,
    id
   ] ;

  
  console.log("Update Data:", updatedData);
  console.log(id);

    updateRawStock(updatedData, (error, results) => {
      if (error) {
        return res.status(500).json({error: "Database query error"});
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Raw Stock Not Found" });
      }
      res.json({ message: "Raw stock data updated successfully." });
  });
};
