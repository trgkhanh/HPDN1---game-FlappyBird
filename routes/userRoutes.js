const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

//  BỎ ROUTE NÀY HOẶC COMMENT NẾU KHÔNG DÙNG NỮA
// router.post("/auth/telegram", userController.authTelegramUser);

// Lấy thông tin người dùng theo telegram_id
router.get("/:id", userController.getUserById);

// Lấy tất cả người dùng
router.get("/", userController.getAllUsers);

module.exports = router;