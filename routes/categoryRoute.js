const express = require("express");
const router = express.Router();
const categoryCountroller = require("./../controlleres/categoryController");
const authMiddleware = require("./../middlewares/authMiddleware");

router
  .route("/category")
  .get(categoryCountroller.getCategories)
  .post(authMiddleware.protect, categoryCountroller.createCategory);
router
  .route("/category/:id")
  .get(categoryCountroller.getCategory)
  .patch(authMiddleware.protect, categoryCountroller.updateCategory)
  .delete(authMiddleware.protect, categoryCountroller.deleteCategory);

module.exports = router;
