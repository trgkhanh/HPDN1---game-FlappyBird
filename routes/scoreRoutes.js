const express = require("express");
const cors = require("cors");

const scoreController = require("../controllers/scoreController");


const app = express();

app.use(cors());
app.use(express.json());

// Gửi điểm số mới
app.post("/update", scoreController.submitScore);

// Lấy bảng xếp hạng
app.get("/", scoreController.getLeaderboard);

// Lấy bảng xếp hạng của người chơi theo ID
app.get("/ranking/:telegram_id", scoreController.getUserRanking);

app.post('/user-mission-progress', scoreController.updateUserMissionProgress); 

module.exports = app;
