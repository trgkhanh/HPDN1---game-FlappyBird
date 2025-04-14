const express = require('express');
const router = express.Router();
const userMissionController = require('../controllers/userMissionController');

// GET /user-missions/:telegram_id => Lấy nhiệm vụ của người dùng
router.get('/:telegram_id', userMissionController.getUserMissions);

// POST /user-missions/assign => Gán nhiệm vụ
router.post('/assign', userMissionController.assignMission);

// POST /user-missions/complete => Hoàn thành nhiệm vụ
router.post('/complete', userMissionController.completeMission);

module.exports = router;
