const AdminAnalyticsModel = require("../models/adminAnalyticsModel");
const db = require("../../config/databaseConnection");
const generateColors = require("../helpers/colors");

// Get all product categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await AdminAnalyticsModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quantities ordered per product for a given category
exports.getCategoryData = async (req, res) => {
  const { category } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const rows = await AdminAnalyticsModel.getCategoryData(
      category,
      startDate,
      endDate
    );
    const labels = rows.map((row) => row.proStockName);
    const data = rows.map((row) => row.total_quantity);
    res.json({
      labels,
      datasets: [
        {
          label: "Quantities Ordered",
          data,
          fill: true,
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get revenue generated per product for a given category
exports.getCategoryRevenueData = async (req, res) => {
  const { category } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const rows = await AdminAnalyticsModel.getCategoryRevenueData(
      category,
      startDate,
      endDate
    );
    const labels = rows.map((row) => row.proStockName);
    const data = rows.map((row) => row.total_revenue);

    res.json({
      labels,
      datasets: [
        {
          label: "Revenue Generated",
          data,
          fill: true,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranches = async (req, res) => {
  try {
    const branches = await AdminAnalyticsModel.getBranches();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranchProductQuantities = async (req, res) => {
  const { branchID } = req.params;
  try {
    const rows = await AdminAnalyticsModel.getBranchProductQuantities(branchID);
    const labels = rows.map((row) => row.proStockName);
    const data = rows.map((row) => row.total_quantity);
    const expiredData = rows.map((row) => row.expired_quantity);
    res.json({
      labels,
      datasets: [
        {
          label: "Quantities Available",
          data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
        {
          label: "Expired Quantities",
          data: expiredData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranchProStocks = async (req, res) => {
  const { branchID } = req.params;
  try {
    const rows = await AdminAnalyticsModel.getBranchProStocks(branchID);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranchRawMaterials = async (req, res) => {
  const { branchID, proStockID } = req.params;
  try {
    const rows = await AdminAnalyticsModel.getBranchRawMaterials(
      branchID,
      proStockID
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    const labels = rows.map((row) => `${row.rawStockName} (${row.units})`);
    const totalQuantities = rows.map((row) => row.total_quantity);

    // Calculate status data
    const statusData = rows.reduce(
      (acc, row) => {
        acc[row.status] = (acc[row.status] || 0) + row.quantity;
        return acc;
      },
      { Available: 0, Expired: 0 }
    );

    const statusDataArray = Object.values(statusData);

    res.json({
      labels,
      datasets: [
        {
          label: "Raw Materials Quantities",
          data: totalQuantities,
          backgroundColor: generateColors(totalQuantities.length),
        },
        {
          label: "Status of Raw Materials",
          data: statusDataArray,
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    });
  } catch (err) {
    console.error(
      `Error fetching raw materials for branch ${branchID} and proStock ${proStockID}:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
};
