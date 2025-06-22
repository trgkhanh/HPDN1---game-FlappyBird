const express = require("express");
const cors = require("cors");

const userController = require("../controllers/userController");

const app = express.Router();

app.use(cors());
app.use(express.json());

// Lấy thông tin người dùng theo telegram_id
app.get("/:id", userController.getUserById);

// Lấy tất cả người dùng
app.get("/", userController.getAllUsers);

// Đăng ký user mới
app.post("/register", userController.registerUser);

// // Đăng nhập
// app.post("/login", userController.loginUser);

// // Lấy tất cả user
// app.get("/", userController.getAllUsers);

// // Cập nhật user
// app.put("/:telegram_id", userController.updateUser);

// // Xoá user
// app.delete("/:telegram_id", userController.deleteUser);

module.exports = app;
