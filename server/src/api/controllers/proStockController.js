const {
  getProStockBatch,
  insertProStock,
  getProStockNames,
  getProStockCategory,
  getProStockSubCategory,
  getProStockIDs,
  getProStock,
  updateProStock,
  updateProStockBatch
} = require("../models/proStockModel");
const { insertProStockBatch } = require("../models/proitemDetailsModel");
const generateProStockID = require("../helpers/generateProStockID");
const generateProBatchNo = require("../helpers/generateProBatchNo");
const db = require("../../config/databaseConnection");
const bucket = require("../../config/firebaseConfig");

//produced stock image upload controller
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("no file uploaded");
    }

    const folderName = "images"; // Replace with your desired folder name
    const blob = bucket.file(
      `${folderName}/${uuidv4()}${path.extname(file.originalname)}`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });
    //console.firebase.google.com/u/0/project/perera-bakers/storage/perera-bakers.appspot.com/files

    https: blobStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Something went wrong while uploading the file.");
    });

    blobStream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server error" });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${perera-bakers.appspot.com}/${blob.name}`;

      const query = ` INSERT INTO prostock (imageUrl) Values (?) `;
      await db.query(query, [publicUrl]);

      res.status(200).json({
        message: "File uploaded successfully",
        imageUrl: publicUrl,
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

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
    pricePerItem,
    category,
    subCategory,
    availableFrom,
    availableTill,
    branchID,
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
    ];

    insertProStock(valuesProStock, (err) => {
      if (err) {
        console.error("Error inserting data into MySQL (producedstock):", err);
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
    branchID,
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

  const updateData = {
    proStockBatchID: id,
    proStockName,
    pricePerItem,
    manufactureDate,
    expirationDate,
    quantity,
    category,
    subCategory,
    availableFrom,
    availableTill,
    branchID,
  };

  updateProStock(updateData, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Produced Stock Not Found" });
    }

    updateProStockBatch(updateData, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database query error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Produced Stock Not Found" });
      }
      res.json({ message: "Produced Stock updated successfully" });
    });
  });
};
