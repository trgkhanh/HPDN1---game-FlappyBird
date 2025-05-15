const express = require("express");
const router = express.Router();
const missionController = require("../controllers/missionController");

router.post("/create", missionController.createMission);
router.get("/", missionController.getAllMissions);
router.get("/:id", missionController.getMissionById);

module.exports = router;
