const db = require("../config/db");

// // Tạo user mới
// exports.createUser = (userData, callback) => {
//   const { telegram_id, name, username, passwords, avatar } = userData;
//   const sql = 'INSERT INTO users (telegram_id, name, username, passwords, avatar) VALUES (?, ?, ?, ?, ?)';
//   db.query(sql, [telegram_id, name, username, passwords, avatar], (err, result) => {
//     if (err) return callback(err);
//     callback(null, result);
//   });
// };

// // Lấy user theo username
// exports.getUserByUsername = (username, callback) => {
//   const sql = 'SELECT * FROM users WHERE username = ?';
//   db.query(sql, [username], (err, results) => {
//     if (err) return callback(err);
//     callback(null, results[0] || null);
//   });
// };

// // Lấy toàn bộ user
// exports.getAllUsers = (callback) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) return callback(err);
//     callback(null, results);
//   });
// };

// // Cập nhật user theo telegram_id
// exports.updateUser = (telegram_id, data, callback) => {
//   const keys = Object.keys(data);
//   const values = Object.values(data);
//   const updates = keys.map((key) => `${key} = ?`).join(', ');
//   const sql = `UPDATE users SET ${updates} WHERE telegram_id = ?`;

//   db.query(sql, [...values, telegram_id], (err, result) => {
//     if (err) return callback(err);
//     callback(null, result);
//   });
// };

// // Xoá user theo telegram_id
// exports.deleteUser = (telegram_id, callback) => {
//   db.query('DELETE FROM users WHERE telegram_id = ?', [telegram_id], (err, result) => {
//     if (err) return callback(err);
//     callback(null, result);
//   });
// };

module.exports = {
  //  Hàm tạo hoặc cập nhật người dùng
  //  TÙY CHỌN: Có thể giữ nguyên hoặc tách thành createUser và updateUser

  //  Hàm lấy thông tin người dùng theo telegram_id
  getById: (telegram_id, callback) => {
    db.query(
      "SELECT * FROM users WHERE telegram_id = ?",
      [telegram_id],
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]); //  Trả về người dùng (nếu có)
      }
    );
  },

  //  Hàm lấy tất cả người dùng
  getAll: (callback) => {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows); //  Trả về mảng tất cả người dùng
    });
  },

  // Đăng ký user mới
  register: (userData, callback) => {
    const { name, username, passwords } = userData;
    // Kiểm tra username đã tồn tại chưa
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, rows) => {
        if (err) return callback(err);
        if (rows.length > 0) {
          // Username đã tồn tại
          return callback(null, {
            success: false,
            message: "Username already exists",
          });
        }
        // Thêm user mới
        const sql =
          "INSERT INTO users (name, username, passwords) VALUES (?, ?, ?)";
        db.query(sql, [name, username, passwords], (err, result) => {
          if (err) return callback(err);
          callback(null, { success: true, insertId: result.insertId });
        });
      }
    );
  },

  // Đăng nhập
    login: (username, passwords, callback) => {
        db.query(
        "SELECT * FROM users WHERE username = ? AND passwords = ?",
        [username, passwords],
        (err, rows) => {
            if (err) return callback(err);
            if (rows.length === 0) {
            // Không tìm thấy user
            return callback(null, { success: false, message: "Không tìm thấy người dùng" });
            }
            // Trả về thông tin người dùng
            callback(null, { success: true, user: rows[0] });
        }
        );
    },
};
