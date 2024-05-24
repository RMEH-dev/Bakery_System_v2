exports.rawStockInputValidate = (req, res, next) => {
    const { rawStockName, manufactureDate, expirationDate, category, quantity, supplierName } = req.body;
  
    if (!rawStockName || !manufactureDate || !expirationDate || !category || !quantity || !supplierName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    next();
  };
  