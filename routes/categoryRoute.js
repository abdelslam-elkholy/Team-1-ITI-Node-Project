const express = require("express");
const router = express.Router();
const categoryCountroller = require("./../controlleres/categoryController");
const authController = require("./../controlleres/authController");

router
  .route("/category")
  .get(categoryCountroller.getCategories)
  .post(authController.protect, categoryCountroller.createCategory);
router
  .route("/category/:id")
  .get(categoryCountroller.getCategory)
  .patch(authController.protect, categoryCountroller.updateCategory)
  .delete(authController.protect, categoryCountroller.deleteCategory);

module.exports = router;
