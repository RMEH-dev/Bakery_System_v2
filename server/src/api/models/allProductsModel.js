const db = require("../../config/databaseConnection");

exports.getProducts = async (offset, limit) => {
  const sqlGetProducts = `SELECT i.proStockBatchID, p.proStockName, p.availableFrom, p.availableTill, p.pricePerItem, p.imageUrl, i.quantity
    FROM prostock p
    JOIN prostockbatch i ON p.proStockID = i.proStockID
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
        FROM prostockbatch;
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
        FROM prostock;
    `;

  return new Promise((resolve, reject) => {
    db.query(sqlGetCategories, (err, rows) => {
      if (err) {
        return reject(new Error("Error fetching categories: " + err.message));
      }

      const categories = {};
      rows.forEach((row) => {
        if (!categories[row.category]) {
          categories[row.category] = [];
        }
        if (
          row.subCategory &&
          !categories[row.category].includes(row.subCategory)
        ) {
          categories[row.category].push(row.subCategory);
        }
      });

      resolve(
        Object.keys(categories).map((category) => ({
          category,
          subCategories: categories[category],
        }))
      );
    });
  });
};

exports.getProductById = async (id) => {
  const sqlGetProductById = `
        SELECT i.proStockBatchID, p.proStockName, p.availableFrom, p.availableTill, p.pricePerItem, p.imageUrl, i.quantity
        FROM prostock p
        JOIN prostockbatch i ON p.proStockID = i.proStockID
        WHERE i.proStockBatchID =?;
    `;

    return new Promise((resolve, reject) => {
      db.query(sqlGetProductById, [id], (err, rows) => {
        if (err) {
          return reject(
            new Error("Error fetching product by id: " + err.message)
          );
        }
        resolve(rows);
      });
    })
}

exports.searchProducts = async (searchTerm) => {
  const sqlSearchProducts = `
      SELECT i.proStockBatchID, p.proStockName
      FROM prostock p
      JOIN prostockbatch i ON p.proStockID = i.proStockID
      WHERE p.proStockName LIKE ?
      AND i.expDate > NOW();
  `;

  return new Promise((resolve, reject) => {
    db.query(sqlSearchProducts, [`%${searchTerm}%`], (err, rows) => {
      if (err) {
        return reject(new Error("Error searching products: " + err.message));
      }
      resolve(rows);
    });
  });
};

exports.getTotalCountBySearch = async (searchTerm) => {
  const sqlGetTotalCountBySearch = `
        SELECT COUNT(*) AS total
        FROM prostock p
        JOIN prostockbatch i ON p.proStockID = i.proStockID
        WHERE p.proStockName LIKE ? AND i.expDate > NOW()
    `;

  return new Promise((resolve, reject) => {
    db.query(sqlGetTotalCountBySearch, [`%${searchTerm}%`], (err, results) => {
      if (err) {
        return reject(
          new Error("Error fetching total count by search term: " + err.message)
        );
      }
      resolve(results[0].total);
    });
  });
};

exports.getProductsByCategory = async (
  category,
  subCategory,
  branchName,
  offset,
  limit
) => {
  let sqlGetProductsByCategory = `
    SELECT i.proStockBatchID, i.quantity, i.expDate, p.proStockName, p.availableFrom, p.availableTill, p.pricePerItem, p.imageUrl
    FROM prostock p
    JOIN prostockbatch i ON p.proStockID = i.proStockID
    JOIN branch b ON i.branchID = b.branchID
    WHERE p.category = ? AND i.expDate > NOW()`;

  const params = [category];

  if (subCategory) {
    sqlGetProductsByCategory += " AND p.subCategory = ?";
    params.push(subCategory);
  }

  if (branchName) {
    sqlGetProductsByCategory += " AND b.branchName = ?";
    params.push(branchName);
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

exports.getTotalCountByCategory = async (category, subCategory, branchName) => {
  let sqlGetTotalCountByCategory = `
        SELECT COUNT(*) AS total
        FROM prostock p
        JOIN prostockbatch i ON p.proStockID = i.proStockID
        JOIN branch b ON i.branchID = b.branchID
        WHERE p.category = ? AND i.expDate > NOW()
    `;

  const params = [category];

  if (subCategory) {
    sqlGetTotalCountByCategory += " AND subCategory = ?";
    params.push(subCategory);
  }
  //   const params = subCategory ? [category, subCategory] : [category];

  if (branchName) {
    sqlGetTotalCountByCategory += " AND b.branchName = ?";
    params.push(branchName);
  }

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
