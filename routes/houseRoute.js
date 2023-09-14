const express = require("express");
const router = express.Router();
const houseController = require("./../controlleres/houseController");

router
  .route("/")
  .get(houseController.getAllHouses)
  .post(houseController.uploadHouseImages, houseController.createHouse);
router
  .route("/:id")
  .get(houseController.getHouse)
  .patch(houseController.updateHouse)
  .delete(houseController.deleteHouse);

module.exports = router;
