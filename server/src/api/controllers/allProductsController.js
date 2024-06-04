const allProductsModel = require("../models/allProductsModel");
const db = require("../../config/databaseConnection");

const getProducts = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  try {
    const products = await allProductsModel.getProducts(
      offset,
      parseInt(limit, 10)
    );
    const total = await allProductsModel.getTotalCount(); // Fetch total count of products
    res.json({ products, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;


  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const product = await allProductsModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await allProductsModel.getCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const products = await allProductsModel.searchProducts(q);
    res.json({ searchResults: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category, subCategory, branchName,  page = 1, limit = 8 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  console.log('Received branchName:', branchName); // Log the branchName

  try {

    const products = await allProductsModel.getProductsByCategory(
      category,
      subCategory,
      branchName,
      parseInt(offset),
      parseInt(limit)
    );
    const total = await allProductsModel.getTotalCountByCategory(
      category,
      subCategory,           
      branchName
    ); // Fetch total count for pagination
    res.json({ products, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = { getProducts, getProductById, getCategories, searchProducts, getProductsByCategory };
