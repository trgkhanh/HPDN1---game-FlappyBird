const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// Đăng nhập hoặc tạo người dùng từ Telegram
router.post("/auth/telegram", userController.authTelegramUser);

// Lấy thông tin người dùng theo telegram_id
router.get("/:id", userController.getUserById);

// Lấy tất cả người dùng (ví dụ)
router.get("/", userController.getAllUsers); // Thêm route này

module.exports = router;
