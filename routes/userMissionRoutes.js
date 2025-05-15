const express = require("express");
const router = express.Router();
const userMissionController = require("../controllers/userMissionController");

router.get("/:userId", userMissionController.getUserMissions);
router.post("/update", userMissionController.updateProgress);
router.post("/claim", userMissionController.claimReward);
router.post("/create", userMissionController.createUserMission);

module.exports = router;
