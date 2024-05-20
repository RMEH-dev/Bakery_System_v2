const express = require("express"); //instance of express library created
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./src/api/routes/authRoutes");
const rawStockRoutes = require("./src/api/routes/rawStockRoutes");
const proStockRoutes = require("./src/api/routes/proStockRoutes");
const rawStockUsageRoutes = require("./src/api/routes/rawStockUsageRoutes");
const productsRoutes = require('./src/api/routes/productsRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/routes", authRoutes)
app.use("/api/routes", rawStockRoutes);
app.use("/api/routes", proStockRoutes);
app.use("/api/routes", rawStockUsageRoutes);
app.use("/api/routes", productsRoutes);



//port assign to the backend server for successful connection requests
app.listen(PORT, () => {
  console.log("listening on port 5000");
});

// module.exports = db;
