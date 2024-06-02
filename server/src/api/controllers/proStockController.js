const {
  getProStockBatch,
  insertProStock,
  getProStockNames,
  getProStockCategory,
  getProStockSubCategory,
  getProStockIDs,
  getProStock,
  updateProStockBatch
} = require("../models/proStockModel");
const { insertProStockBatch } = require("../models/proitemDetailsModel");
const generateProStockID = require("../helpers/generateProStockID");
const generateProBatchNo = require("../helpers/generateProBatchNo");
const db = require("../../config/databaseConnection");
const bucket = require("../../config/firebaseConfig");


exports.getProStockInfo = (req, res) => {
  getProStockBatch([], (error, results) => {
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

exports.addProStock = (req, res) => {
  const {
    proStockName,
    manufactureDate,
    expirationDate,
    quantity,
    thresholdQuantity,
    pricePerItem,
    category,
    subCategory,
    availableFrom,
    availableTill,
    branchID,
    imageUrl,
  } = req.body;

  generateProStockID((err, newProStockID) => {
    if (err) {
      console.error("Error generating new proStockID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const valuesProStock = [
      newProStockID,
      proStockName,
      category,
      subCategory,
      availableFrom,
      availableTill,
      pricePerItem,
      branchID,
      imageUrl,
    ];

    insertProStock(valuesProStock, (err) => {
      if (err) {
        console.error("Error inserting data into MySQL (prostock):", err);
        return res.status(500).json({ error: "Database error" });
      }

      generateProBatchNo(newProStockID, (err, newProStockBatchID) => {
        if (err) {
          console.error("Error generating new proBatchNo:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const valuesProItemDetails = [
          newProStockBatchID,
          newProStockID,
          quantity,
          thresholdQuantity,
          manufactureDate,
          expirationDate,
          branchID,
        ];

        insertProStockBatch(valuesProItemDetails, (err) => {
          if (err) {
            console.error(
              "Error inserting data into MySQL (prostockbatch):",
              err
            );
            return res.status(500).json({ error: "Database error" });
          }
          res.status(200).json({
            message: "Produced stock added successfully",
            proStockID: newProStockID,
            proStockBatchID: newProStockBatchID,
          });
        });
      });
    });
  });
};

//to get the product related names
exports.getProStockNames = (req, res) => {
  getProStockNames((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getProStockCategory = (req, res) => {
  getProStockCategory((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getProStockSubCategory = (req, res) => {
  getProStockSubCategory((error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

// Controller to fetch produced stock IDs based on the produced stock name
exports.getProStockIDs = (req, res) => {
  const proStockName = req.query.proStockName;
  getProStockIDs(proStockName, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

exports.getProStock = (req, res) => {
  const { id } = req.params;
  getProStock(id, (error, results) => {
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

exports.updateProStock = (req, res) => {
  const { id } = req.params;
  const {
    proStockName,
    pricePerItem,
    manufactureDate,
    expirationDate,
    quantity,
    category,
    subCategory,
    availableFrom,
    availableTill,
    branchID
  } = req.body;

  console.log("Received Data", req.body);


  if (
    !proStockName ||
    !pricePerItem ||
    !manufactureDate ||
    !expirationDate ||
    !quantity ||
    !category ||
    !subCategory ||
    !availableFrom ||
    !availableTill ||
    !branchID
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updateData = [
    proStockName,
    pricePerItem,
    category,
    subCategory,
    availableFrom,
    availableTill,
    quantity,
    manufactureDate,
    expirationDate,
    branchID,
    id
  ];

  console.log("Update Data:", updateData);
  console.log(id);

    updateProStockBatch(updateData, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database query error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Produced Stock Not Found" });
      }
      res.json({ message: "Produced Stock updated successfully" });
    });
};
