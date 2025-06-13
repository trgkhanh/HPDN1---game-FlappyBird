const User = require("../models/userModel.js");

//  BỎ HÀM NÀY HOẶC COMMENT NẾU KHÔNG DÙNG NỮA
// exports.authTelegramUser = (req, res) => { ... };

exports.getUserById = (req, res) => {
  const telegram_id = req.params.id;
  User.getById(telegram_id, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy thông tin người dùng" });
    }
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json(user);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách người dùng" });
    }
    res.json(users);
  });
};
