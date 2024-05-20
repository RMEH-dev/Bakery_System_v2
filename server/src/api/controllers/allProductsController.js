const allProductsModel = require('../models/allProductsModel');

const getProducts = async (req, res) => {
    const { page = 1, limit = 8} = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    try{
        const products = await allProductsModel.getProducts(offset, parseInt(limit, 10));
        const total = await allProductsModel.getTotalCount(); // Fetch total count of products
        res.json({ products, total });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server error" });
    };
};

const getCategories = async (req, res) => {
    try {
        const categories = await allProductsModel.getCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server error" });
    };
};

const getProductsByCategory = async (req,res) => {
    const { category, subCategory, page = 1, limit = 8} = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    try{
        const products = await allProductsModel.getProductsByCategory(category, subCategory, parseInt(offset), parseInt(limit));
        const total = await allProductsModel.getTotalCountByCategory(category, subCategory); // Fetch total count for pagination
        res.json({ products, total });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Internal Server error" });
    }
}


module.exports = { getProducts, getCategories, getProductsByCategory}