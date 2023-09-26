const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");
const authController = require("../controllers/authController");

const protectAdminRoutes = [
  authController.protect,
  authController.restrictTo("admin"),
];

router
  .route("/")
  .get(houseController.getAllHouses)
  .post(
    ...protectAdminRoutes,
    houseController.uploadHouseImages,
    houseController.resizeHouseImages,
    houseController.createHouse
  );

router
  .route("/:id")
  .get(houseController.getHouse)
  .patch(...protectAdminRoutes, houseController.updateHouse)
  .delete(...protectAdminRoutes, houseController.deleteHouse);

module.exports = router;
