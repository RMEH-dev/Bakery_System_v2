const getBranches= require('../models/getBranchesModel')

exports.getBranches = (req, res) => {
    getBranches((error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
  };

