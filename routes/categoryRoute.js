const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const protectAdminRoutes = [
  authController.protect,
  authController.restrictTo("admin"),
];

router
  .route("/")
  .get(categoryController.getCategories)
  .post(...protectAdminRoutes, categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(...protectAdminRoutes, categoryController.updateCategory)
  .delete(...protectAdminRoutes, categoryController.deleteCategory);

module.exports = router;
