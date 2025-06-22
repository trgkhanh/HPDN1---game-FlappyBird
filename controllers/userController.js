const User = require("../models/userModel");

// // Đăng ký
// exports.registerUser = (req, res) => {
//   const userData = req.body;

//   userModel.createUser(userData, (err, result) => {
//     if (err) {
//       console.error('Lỗi tạo user:', err);
//       return res.status(500).json({ error: 'Đăng ký thất bại.' });
//     }
//     res.status(201).json({ message: 'Đăng ký thành công', userId: result.insertId });
//   });
// };

// // Đăng nhập
// exports.loginUser = (req, res) => {
//   const { username, passwords } = req.body;

//   userModel.getUserByUsername(username, (err, user) => {
//     if (err) {
//       console.error('Lỗi truy vấn:', err);
//       return res.status(500).json({ error: 'Lỗi server' });
//     }

//     if (!user || user.passwords !== passwords) {
//       return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
//     }

//     res.status(200).json({ message: 'Đăng nhập thành công', user });
//   });
// };

// // Lấy tất cả user
// exports.getAllUsers = (req, res) => {
//   userModel.getAllUsers((err, users) => {
//     if (err) {
//       return res.status(500).json({ error: 'Không lấy được danh sách người dùng' });
//     }
//     res.status(200).json(users);
//   });
// };

// // Cập nhật user
// exports.updateUser = (req, res) => {
//   const telegram_id = req.params.telegram_id;
//   const data = req.body;

//   userModel.updateUser(telegram_id, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Cập nhật thất bại' });
//     }
//     res.status(200).json({ message: 'Cập nhật thành công', result });
//   });
// };

// // Xoá user
// exports.deleteUser = (req, res) => {
//   const telegram_id = req.params.telegram_id;

//   userModel.deleteUser(telegram_id, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Xoá thất bại' });
//     }
//     res.status(200).json({ message: 'Xoá người dùng thành công', result });
//   });
// };

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

exports.registerUser = (req, res) => {
  const userData = req.body;
  User.register(userData, (err, result) => {
    if (err) {
      console.error("Lỗi đăng ký người dùng:", err);
      return res.status(500).json({ error: "Đăng ký thất bại.1111" });
    }
    res
      .status(201)
      .json({ message: "Đăng ký thành công", userId: result.insertId });
  });
};

exports.loginUser = (req, res) => {
  const { username, passwords } = req.body;
  User.login(username, passwords, (err, user) => {
    if (err) {
      console.error("Lỗi đăng nhập:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    if (!user) {
      return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
    }
    res.status(200).json({ message: "Đăng nhập thành công", user });
  });
};


