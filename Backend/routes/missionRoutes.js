const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// Lấy tất cả nhiệm vụ
router.get('/', missionController.getAllMissions);

// Lấy nhiệm vụ theo ID
router.get('/:id', missionController.getMissionById);

// Tạo nhiệm vụ mới
router.post('/', missionController.createMission);

// Cập nhật nhiệm vụ
router.put('/:id', missionController.updateMission);

// Xóa nhiệm vụ
router.delete('/:id', missionController.deleteMission);

module.exports = router;
