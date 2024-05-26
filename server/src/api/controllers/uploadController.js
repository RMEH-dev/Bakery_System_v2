// uploadController.js
const bucket = require('./firebaseConfig');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('../../config/databaseConnection');

db.query = util.promisify(db.query);

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const proStockName = req.body.proStockName;
    const pricePerItem = req.body.pricePerItem;
    const otherAttributes = req.body.otherAttributes; // Add other necessary attributes

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const blob = bucket.file(uuidv4() + path.extname(file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Something went wrong while uploading the file.');
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const query = `INSERT INTO products (proStockName, pricePerItem, otherAttributes, imageUrl) VALUES (?, ?, ?, ?)`;
      await db.query(query, [proStockName, pricePerItem, otherAttributes, publicUrl]);

      res.status(200).send({ message: 'File uploaded successfully', imageUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
};

module.exports = {
  uploadFile,
};
