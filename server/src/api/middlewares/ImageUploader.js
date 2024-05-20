const path = require("path"); 
const multer = require("multer");



// Using multer to store images in local filesystem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({
    storage: storage,
  });
  
  // database configuration and connection
  
  
  
  app.set("view engine");
  
  //Post method to do upload images (product images) to the filesystem
  app.post("/productImages", upload.single("productImage"), (req, res) => {
    console.log(req.file);
  });