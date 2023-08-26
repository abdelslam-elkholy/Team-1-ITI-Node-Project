const express = require("express");
const wishlistModel = require("../models/wishlist");
const Router = express.Router();
const {
  saveWishlist,
  getAllWishlist,
  getWishlistById,
  updateWishlistById,
  deleteWishlistById,
} = require("../controlleres/wishlistController");

Router.post("/", async (req, res) => {
  const wish = req.body;
  try {
    var newWishlist = await saveRivew(wish);

    res.status(201).json({ wishlist: newWishlist });
  } catch (err) {
    res.status(500).json({ message: err });
  }
})
  .get("/", async (req, res) => {
    try {
      const wishlists = await getAllWishlist();
      res.json({ wishlists });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .get("/:id", (req, res) => {
    const { id } = req.params;
    getWishlistById(id, res);
  })
  .patch("/:id", (req, res) => {
    var { id } = req.params;

    const { HostID, UserID } = req.body;
    updateWishlistById(id, HostID, UserID);
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    deleteWishlistById(id, res);
  });

module.exports = Router;
