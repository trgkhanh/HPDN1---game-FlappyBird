const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng nhập hoặc tạo người dùng từ Telegram
router.post('/auth', userController.authTelegramUser);

// Lấy thông tin người dùng theo telegram_id
router.get('/:id', userController.getUserById);

module.exports = router;
