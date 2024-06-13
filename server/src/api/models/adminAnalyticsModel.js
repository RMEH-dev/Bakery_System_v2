const db = require("../../config/databaseConnection");

const AdminAnalyticsModel = {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT DISTINCT category FROM prostock", (err, results) => {
        if (err) return reject(err);
        const categories = results.map((row) => row.category);
        resolve(categories);
      });
    });
  },

  getBranches: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT branchID, branchName FROM branch", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getCategoryData: (category, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT DISTINCT p.proStockName, SUM(od.quantity) as total_quantity
        FROM orderdetails od
        JOIN prostockbatch pb ON od.proStockBatchID = pb.proStockBatchID
        JOIN prostock p ON pb.proStockID = p.proStockID
        JOIN orders o ON od.orderID = o.orderID
        WHERE p.category = ?
        AND o.orderDate BETWEEN ? AND ?
        GROUP BY p.proStockID
        ORDER BY p.proStockName
      `;
      db.query(query, [category, startDate, endDate], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getCategoryRevenueData: (category, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.proStockName, SUM(od.quantity * p.pricePerItem) as total_revenue
        FROM orderdetails od
        JOIN prostockbatch pb ON od.proStockBatchID = pb.proStockBatchID
        JOIN prostock p ON pb.proStockID = p.proStockID
        JOIN orders o ON od.orderID = o.orderID
        WHERE p.category = ?
        AND o.orderDate BETWEEN ? AND ?
        GROUP BY p.proStockID
        ORDER BY p.proStockName
      `;
      db.query(query, [category, startDate, endDate], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getBranchProductQuantities: (branchID) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.proStockName, SUM(pb.quantity) as total_quantity, 
        SUM(CASE WHEN pb.expDate < NOW() THEN pb.quantity ELSE 0 END) as expired_quantity
        FROM prostockbatch pb
        JOIN prostock p ON pb.proStockID = p.proStockID
        WHERE pb.branchID = ?
        GROUP BY p.proStockID
        ORDER BY p.proStockName
      `;
      db.query(query, [branchID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getBranchProStocks: (branchID) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT proStockID, proStockName
        FROM prostock
        WHERE branchID = ?
      `;
      db.query(query, [branchID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getBranchRawMaterials: (branchID, proStockID) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT rs.rawStockName, rsb.quantity, rsb.status, rs.units,
               SUM(rsb.quantity) as total_quantity
        FROM rawstockbatch rsb
        JOIN rawstock rs ON rsb.rawStockID = rs.rawStockID
        WHERE rsb.branchID = ? AND rs.proStockID = ?
        GROUP BY rs.rawStockID, rsb.status
        ORDER BY rs.rawStockName
      `;
      console.log(
        `Executing SQL Query: ${query} with params: ${branchID}, ${proStockID}`
      );
      db.query(query, [branchID, proStockID], (err, results) => {
        if (err) return reject(err);
        console.log("SQL Query Results:", results);
        resolve(results);
      });
    });
  },
};

module.exports = AdminAnalyticsModel;
