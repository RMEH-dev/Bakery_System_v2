exports.proStockInputValidate = (req, res, next) => {
    const { proStockName, manufactureDate, expirationDate, category, subCategory,  quantity, pricePerItem } = req.body;
  
    if (!proStockName || !manufactureDate || !expirationDate || !category || !subCategory || !quantity || !pricePerItem) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    next();
  };
  