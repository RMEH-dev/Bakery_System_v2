const db = require("../../config/databaseConnection");

exports.getProducts = async (offset, limit) => {
  const sqlGetProducts = `SELECT p.proStockID, p.proStockName, p.availableFrom, p.availableTill, i.pricePerItem
    FROM producedstock p
    JOIN proitemdetails i ON p.proStockID = i.proStockID
    LIMIT ?, ?;`;

  return new Promise((resolve, reject) => {
    db.query(sqlGetProducts, [offset, limit], (err, rows) => {
      if (err) {
        return reject(new Error("Error fetching products: " + err.message));
      }
      resolve(rows);
    });
  });
};

exports.getTotalCount = async () => {
  const sqlGetTotalCount = `
        SELECT COUNT(*) AS total
        FROM proitemdetails;
    `;

  return new Promise((resolve, reject) => {
    db.query(sqlGetTotalCount, (err, results) => {
      if (err) {
        reject(new Error("Error fetching total count: " + err.message));
      } else {
        resolve(results[0].total);
      }
    });
  });
};

exports.getCategories = async () => {
  const sqlGetCategories = `
        SELECT category, subCategory
        FROM proitemdetails;
    `;

  return new Promise((resolve, reject) => {
    db.query(sqlGetCategories, (err, rows) => {
        if (err) {
            return reject(new Error("Error fetching categories: " + err.message));
          }
    
          const categories = {};
          rows.forEach(row => {
            if (!categories[row.category]) {
              categories[row.category] = [];
            }
            if (row.subCategory && !categories[row.category].includes(row.subCategory)) {
              categories[row.category].push(row.subCategory);
            }
          });
    
          resolve(Object.keys(categories).map(category => ({
            category,
            subCategories: categories[category]
          })));
        });
      });
    };

exports.getProductsByCategory = async (
  category,
  subCategory,
  offset,
  limit
) => {
  let sqlGetProductsByCategory = `
    SELECT p.proStockID, p.proStockName, p.availableFrom, p.availableTill, i.pricePerItem
    FROM producedstock p
    JOIN proitemdetails i ON p.proStockID = i.proStockID
    WHERE i.category =?`;

  const params = [category];

  if (subCategory) {
    sqlGetProductsByCategory += " AND i.subCategory = ?";
    params.push(subCategory);
  }

  sqlGetProductsByCategory += " LIMIT ?, ?";
  params.push(offset, limit);

  return new Promise((resolve, reject) => {
    db.query(sqlGetProductsByCategory, params, (err, rows) => {
      if (err) {
        return reject(
          new Error("Error fetching products by category: " + err.message)
        );
      }
      resolve(rows);
    });
  });
};

exports.getTotalCountByCategory = async (category, subCategory) => {
  let sqlGetTotalCountByCategory = `
        SELECT COUNT(*) AS total
        FROM proitemdetails
        WHERE category = ?
    `;

  const params = [category];

  if (subCategory) {
    sqlGetTotalCountByCategory += " AND subCategory = ?";
    params.push(subCategory);
  }
//   const params = subCategory ? [category, subCategory] : [category];

  return new Promise((resolve, reject) => {
    db.query(sqlGetTotalCountByCategory, params, (err, results) => {
      if (err) {
        return reject(
          new Error("Error fetching total count by category: " + err.message)
        );
      }
      resolve(results[0].total);
    });
  });
};
