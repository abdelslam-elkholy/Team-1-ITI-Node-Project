const express = require("express");
const router = express.Router();
const houseController = require("./../controlleres/houseController");
const authController = require("./../controlleres/authController");

router
  .route("/")
  .get(houseController.getAllHouses)
  .post(
    houseController.uploadHouseImages,
    houseController.resizeHouseImages,
    authController.protect,
    authController.restrictTo("admin"),
    houseController.createHouse
  );
router
  .route("/:id")
  .get(houseController.getHouse)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    houseController.updateHouse
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    houseController.deleteHouse
  );

module.exports = router;
