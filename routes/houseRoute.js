const express = require("express");
const router = express.Router();
const houseController = require("./../controlleres/houseController");

router
  .route("/house")
  .get(houseController.getHouses)
  .post(houseController.createHouse);
router
  .route("/house/:id")
  .get(houseController.getHouse)
  .patch(houseController.updateHouse)
  .delete(houseController.deleteHouse);

module.exports = router;
