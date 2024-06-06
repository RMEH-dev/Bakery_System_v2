const CartModel = require("../models/cartModel");
const db = require("../../config/databaseConnection");

const CartController = {
  getCart: (req, res) => {
    const { userId } = req.params;
    const sqlGetCartItems = `SELECT * FROM cartItem WHERE userID = ?`;
    db.query(sqlGetCartItems, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching cart items:", err);
        return res.status(500).send("Error fetching cart items.");
      }
      res.status(200).send(results);
    });
  },
  
  addToCart: (req, res) => {
    const { userID, proStockBatchID, branchName } = req.body;

    console.log(userID, proStockBatchID);

    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Error starting transaction:", transactionErr);
        return res.status(500).send("Transaction error.");
      }

      const reduceStockQuery =
        "UPDATE proStockBatch SET quantity = quantity - 1 WHERE proStockBatchID = ? AND quantity > 0";
      db.query(
        reduceStockQuery,
        [proStockBatchID],
        (reduceStockErr, reduceStockResult) => {
          if (reduceStockErr) {
            console.error("Error reducing stock:", reduceStockErr);
            return db.rollback(() => {
              res.status(500).send("Error reducing stock.");
            });
          }

          if (reduceStockResult.affectedRows === 0) {
            return db.rollback(() => {
              res.status(400).send("Insufficient stock.");
            });
          }

          CartModel.getCartByUserID(userID, (getCartErr, results) => {
            console.log("wada wada", getCartErr);
            if (getCartErr) {
              console.error("Error fetching cart by user ID:", getCartErr);
              return res
                .status(500)
                .send("Error fetching cart by user ID:", getCartErr);
            }

            let cartID;

            const addToCart = (cartID) => {
              CartModel.addItemToCart(
                cartID,
                proStockBatchID,
                (addItemErr, addItemResult) => {
                  if (addItemErr) {
                    console.error("Error adding item to cart:", addItemErr);
                    return db.rollback(() => {
                      res.status(500).send("Error adding item to cart.");
                    });
                  }

                  db.commit((commitErr) => {
                    if (commitErr) {
                      console.error("Error committing transaction:", commitErr);
                      return db.rollback(() => {
                        res.status(500).send("Transaction commit error.");
                      });
                    }

                    console.log("Item added to cart:", addItemResult);
                    res.status(200).send("Item added to cart");
                  });
                }
              );
            };

            if (results.length > 0) {
              cartID = results[0].cartID;
              console.log("Existing cart found:", cartID);
              addToCart(cartID);
            } else {
              console.log("No existing cart found, creating new cart");
              CartModel.createCart(
                userID,
                (createCartErr, createCartResult) => {
                  if (createCartErr) {
                    console.error("Error creating new cart:", createCartErr);
                    return db.rollback(() => {
                      res.status(500).send("Error creating cart.");
                    });
                  }

                  cartID = createCartResult.insertId;
                  console.log("New cart created:", cartID);
                  addToCart(cartID);
                }
              );
            }
          });
        }
      );
    });
  },

  getCartItems: (req, res) => {
    // console.log("Request params:", req.params);
    const { userId } = req.params;
    // console.log("UserID from request params:", id);
    if (!userId) {
      return res.status(400).json({ error: "UserID is required" });
    }

    CartModel.getCartItemsByUserID([userId], (err, results) => {
      if (err) {
        console.error("Error fetching cart items:", err);
        return res.status(500).send(err);
      }
      // console.log("Success fetching cart items: from request params:");
      res.status(200).json(results);
      // console.log(results)
    });
  },

  getCartItemCount: (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "UserID is required" });
    }

    CartModel.getCartItemCountByUserID([id], (err, results) => {
      if (err) {
        console.error("Error fetching cart item count:", err);
        return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
  },

  removeFromCart: (req, res) => {
    const { cartItemID, proStockBatchID, quantity } = req.body;

    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Error starting transaction:", transactionErr);
        return res.status(500).send("Transaction error.");
      }

      CartModel.removeItemFromCart(cartItemID, (removeErr) => {
        if (removeErr) {
          console.error("Error removing item from cart:", removeErr);
          return db.rollback(() => {
            res.status(500).send("Error removing item from cart.");
          });
        }

        CartModel.increaseStock(proStockBatchID, quantity, (increaseErr) => {
          if (increaseErr) {
            console.error("Error increasing stock:", increaseErr);
            return db.rollback(() => {
              res.status(500).send("Error increasing stock.");
            });
          }

          db.commit((commitErr) => {
            if (commitErr) {
              console.error("Error committing transaction:", commitErr);
              return db.rollback(() => {
                res.status(500).send("Transaction commit error.");
              });
            }

            res.status(200).send("Item removed from cart and stock updated.");
          });
        });
      });
    });
  },

  updateCartItemQuantity: (req, res) => {
    const { cartItemID, newQuantity, proStockBatchID, originalQuantity } =
      req.body;
    const quantityDifference = newQuantity - originalQuantity;

    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Error starting transaction:", transactionErr);
        return res.status(500).send("Transaction error.");
      }

      CartModel.updateItemQuantity(cartItemID, newQuantity, (updateErr) => {
        if (updateErr) {
          console.error("Error updating item quantity:", updateErr);
          return db.rollback(() => {
            res.status(500).send("Error updating item quantity.");
          });
        }

        CartModel.adjustStock(
          proStockBatchID,
          -quantityDifference,
          (adjustErr) => {
            if (adjustErr) {
              console.error("Error adjusting stock:", adjustErr);
              return db.rollback(() => {
                res.status(500).send("Error adjusting stock.");
              });
            }

            db.commit((commitErr) => {
              if (commitErr) {
                console.error("Error committing transaction:", commitErr);
                return db.rollback(() => {
                  res.status(500).send("Transaction commit error.");
                });
              }

              res.status(200).send("Item quantity updated and stock adjusted.");
            });
          }
        );
      });
    });
  },
};

module.exports = CartController;
