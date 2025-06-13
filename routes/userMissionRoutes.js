const express = require("express");
const cors = require("cors");

const userMissionController = require("../controllers/userMissionController");

const appp = express();

appp.use(cors());
appp.use(express.json());

appp.get("/:userId", userMissionController.getUserMissions);

appp.post("/update", userMissionController.editUserMissionProgress);

appp.post("/claim", userMissionController.claimReward);

appp.post("/create", userMissionController.createUserMission);


module.exports = appp;
