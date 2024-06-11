const db = require("../../config/databaseConnection");

const getOrders= (values, callback) => {
  const sqlOrders = `SELECT u.firstName, o.orderID, o.orderType, DATE_FORMAT(o.orderDate, '%Y-%m-%d') AS orderDate, o.orderStatus, o.totalAmount, p.paymentType, p.paymentStatus, d.deliveryType, u.contact, a.street, a.city, o.customerAlert
  FROM user u
  JOIN orders o ON u.userID = o.userID
  JOIN payment p ON p.paymentID = o.paymentID
  JOIN delivery d ON d.deliveryID = o.deliveryID
  JOIN addresses a ON a.addressID = o.addressID`;
  db.query(sqlOrders, values, callback);
};

const getOrderDetails = (orderID, callback) => {
    const sqlGetOrderDetails = `
    SELECT od.orderDetailsID, o.orderID, p.proStockName, od.quantity 
    FROM orderdetails od 
    JOIN orders o ON o.orderID = od.orderID 
    JOIN proStockBatch pb ON pb.proStockBatchID = od.proStockBatchID 
    JOIN proStock p ON p.proStockID = pb.proStockID
    WHERE o.orderID = ?
    `;
    db.query(sqlGetOrderDetails, orderID, callback)
};

const updateOrderStatus = (orderID, orderStatus, callback) => {
    const query = 'UPDATE orders SET orderStatus = ? WHERE orderID = ?';
    db.query(query, [orderStatus, orderID], callback);
  };
  
  const getPaymentID = (orderID, callback) => {
    const query = 'SELECT paymentID FROM orders WHERE orderID = ?';
    db.query(query, [orderID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        return callback(null, results[0].paymentID);
      } else {
        return callback(new Error('No paymentID found for the given orderID'), null);
      }
    });
  };
  
  const updatePaymentStatus = (paymentID, paymentStatus, callback) => {
    const query = 'UPDATE payment SET paymentStatus = ? WHERE paymentID = ?';
    db.query(query, [paymentStatus, paymentID], callback);
  };






module.exports = {
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  getPaymentID,
  updatePaymentStatus
};
