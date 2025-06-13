const db = require("../config/db");

module.exports = {
  //  Hàm tạo hoặc cập nhật người dùng
  //  TÙY CHỌN: Có thể giữ nguyên hoặc tách thành createUser và updateUser
  createOrUpdate: (telegram_id, name, avatar, callback) => {
    db.query(
      "SELECT * FROM users WHERE telegram_id = ?",
      [telegram_id],
      (err, rows) => {
        if (err) {
          return callback(err);
        }

        if (rows.length > 0) {
          //  Cập nhật thông tin người dùng hiện có
          db.query(
            "UPDATE users SET name = ?, avatar = ? WHERE telegram_id = ?",
            [name, avatar, telegram_id],
            (updateErr) => {
              if (updateErr) return callback(updateErr);
              //  Lấy thông tin người dùng đã cập nhật
              db.query(
                "SELECT telegram_id, name, avatar, gold, high_score FROM users WHERE telegram_id = ?",
                [telegram_id],
                (selectErr, updatedRows) => {
                  if (selectErr) return callback(selectErr);
                  callback(null, updatedRows[0]);
                }
              );
            }
          );
        } else {
          //  Tạo người dùng mới
          db.query(
            "INSERT INTO users (telegram_id, name, avatar) VALUES (?, ?, ?)",
            [telegram_id, name, avatar],
            (insertErr) => {
              if (insertErr) return callback(insertErr);
              //  Lấy thông tin người dùng vừa tạo
              db.query(
                "SELECT telegram_id, name, avatar, gold, high_score FROM users WHERE telegram_id = ?",
                [telegram_id],
                (selectErr, newRows) => {
                  if (selectErr) return callback(selectErr);
                  callback(null, newRows[0]);
                }
              );
            }
          );
        }
      }
    );
  },

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
    }
  };
