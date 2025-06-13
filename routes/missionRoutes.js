const express = require("express");
const cors = require("cors");

const missionController = require("../controllers/missionController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create", missionController.createMission);

app.get("/", missionController.getAllMissions);

app.get("/:id", missionController.getMissionById);

module.exports = app;
