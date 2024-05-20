exports.rawStockInputValidate = (req, res, next) => {
    const { rawStockName, manufactureDate, expirationDate, category, quantity, supplier } = req.body;
  
    if (!rawStockName || !manufactureDate || !expirationDate || !category || !quantity || !supplier) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    next();
  };
  