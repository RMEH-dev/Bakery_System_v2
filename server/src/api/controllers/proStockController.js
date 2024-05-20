const {
  getProStockDetails,
  insertProStock,
  getProStockNames,
  getProStockIDs,
  getProStock,
  updateProStock,
} = require("../models/proStockModel");
const generateProStockID = require("../helpers/generateProStockID");
const generateProBatchNo = require("../helpers/generateProBatchNo");
const { insertProItemDetails } = require("../models/proItemDetailsModel");
const db = require("../../config/databaseConnection");

// exports.postCheckExistingProStock = (req, res) => {
//   checkExistingProStock((error, results) => {
//     if (error) {
//       console.error("Error checking existing proStock:", error);
//       res.status(500).json({ message: "Internal server error" });
//       return;
//     }
//     res.json({ exists: results.length > 0 });
//   });
// };

exports.getProStockInfo = (req, res) => {
  getProStockDetails([], (error, results) => {
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
    pricePerItem,
    category,
    subCategory,
    availableFrom,
    availableTill,
  } = req.body;

  generateProStockID((err, newProStockID) => {
    if (err) {
      console.error("Error generating new proStockID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const valuesProStock = [
      newProStockID,
      proStockName,
      quantity,
      manufactureDate,
      expirationDate,
      availableFrom,
      availableTill,
    ];

    insertProStock(valuesProStock, (err) => {
      if (err) {
        console.error("Error inserting data into MySQL (producedstock):", err);
        return res.status(500).json({ error: "Database error" });
      }

      generateProBatchNo(newProStockID, (err, newProBatchNo) => {
        if (err) {
          console.error("Error generating new proBatchNo:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const valuesProItemDetails = [
          newProStockID,
          newProBatchNo,
          category,
          subCategory,
          pricePerItem,
        ];

        insertProItemDetails(valuesProItemDetails, (err) => {
          if (err) {
            console.error(
              "Error inserting data into MySQL (proitemdetails):",
              err
            );
            return res.status(500).json({ error: "Database error" });
          }

          res.status(200).json({
            message: "Produced stock added successfully",
            proStockID: newProStockID,
            proBatchNo: newProBatchNo,
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
  } = req.body;

  if (
    !proStockName ||
    !pricePerItem ||
    !manufactureDate ||
    !expirationDate ||
    !quantity ||
    !category ||
    !subCategory ||
    !availableFrom ||
    !availableTill
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  const updateData = [
    quantity,
    proStockName,
    manufactureDate,
    expirationDate,
    availableFrom,
    availableTill,
    category,
    subCategory,
    pricePerItem,
    id,
  ];

  updateProStock(updateData, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Produced Stock Not Found" });
    }
    res.json({ message: "Produced Stock updated successfully" });
  });
};


