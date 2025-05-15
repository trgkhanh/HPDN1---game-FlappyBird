const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// Gửi điểm số mới
router.post('/', scoreController.submitScore);

// Lấy bảng xếp hạng
router.get('/', scoreController.getLeaderboard);

module.exports = router;
