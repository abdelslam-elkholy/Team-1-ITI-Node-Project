const express = require("express");
const router = express.Router();
const categoryCountroller = require("./../controlleres/categoryController");
const authController = require("./../controlleres/authController");

router
  .route("/")
  .get(categoryCountroller.getCategories)
  .post(categoryCountroller.createCategory);
router
  .route("/:id")
  .get(categoryCountroller.getCategory)
  .patch(categoryCountroller.updateCategory)
  .delete(categoryCountroller.deleteCategory);

module.exports = router;
