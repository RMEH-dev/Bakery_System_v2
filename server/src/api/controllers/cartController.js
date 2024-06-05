const CartModel = require("../models/cartModel");

const CartController = {
  addToCart: (req, res) => {
    const { userID, proStockBatchID, quantity } = req.body;

    console.log(userID, proStockBatchID);

    CartModel.getCartByUserID(userID, (err, results) => {
      console.log("wada wada", err);
      if (err) {
        console.error("Error fetching cart by user ID:", err);
        return res.status(500).send(err);
      }

      let cartID;

      if (results.length > 0) {
        cartID = results[0].cartID;
        console.log("Existing cart found:", cartID);

        CartModel.addItemToCart(cartID, proStockBatchID, (err, results) => {
          if (err) {
            console.error("Error adding item to existing cart:", err);
            return res.status(500).send(err);
          }
          console.log("Item added to existing cart:", results);
          res.status(200).send("Item added to cart");
        });
      } else {
        console.log("No existing cart found, creating new cart");
        CartModel.createCart(userID, (err, results) => {
          if (err) {
            console.error("Error creating new cart:", err);
            return res.status(500).send(err);
          }
          cartID = results.insertId;
          console.log("New cart created:", cartID);

          CartModel.addItemToCart(cartID, proStockBatchID, (err, results) => {
            if (err) {
              console.error("Error adding item to new cart:", err);
              return res.status(500).send(err);
            }
            console.log("Item added to new cart:", results);
            res.status(200).send("Item added to cart");
          });
        });
      }
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
};



module.exports =  CartController ;
