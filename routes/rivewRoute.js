const express = require("express");
const router = express.Router();
const rivewController = require("./../controllers/rivewController");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(rivewController.getRivews)
  .post(rivewController.createRivew);
router
  .route("/:id")
  .get(rivewController.getRivew)
  .patch(rivewController.updateRivew)
  .delete(rivewController.deleteRivew);

router.route("/user/:id").get(rivewController.getUserRivews);
router.route("/house/:id").get(rivewController.getHouseRivews);

module.exports = router;
