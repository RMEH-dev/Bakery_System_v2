const express = require("express"); //instance of express library created
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const authRoutes = require("./src/api/routes/authRoutes");
const rawStockRoutes = require("./src/api/routes/rawStockRoutes");
const proStockRoutes = require("./src/api/routes/proStockRoutes");
const rawStockUsageRoutes = require("./src/api/routes/rawStockUsageRoutes");
const usersRoutes = require("./src/api/routes/usersRoutes");
const productsRoutes = require('./src/api/routes/productsRoutes');
const branchesRoutes = require('./src/api/routes/branchesRoutes');
const cartRoutes = require('./src/api/routes/cartRoutes');
const orderRoutes = require('./src/api/routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT



app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/routes", authRoutes)
app.use("/api/routes", rawStockRoutes);
app.use("/api/routes", proStockRoutes);
app.use("/api/routes", rawStockUsageRoutes);
app.use("/api/routes", usersRoutes);
app.use("/api/routes", productsRoutes);
app.use("/api/routes", branchesRoutes);
app.use("/api/routes", cartRoutes);
app.use("/api/routes", orderRoutes);


//port assign to the backend server for successful connection requests
app.listen(PORT, () => {
  console.log("listening on port 5050");
});

// module.exports = db;
