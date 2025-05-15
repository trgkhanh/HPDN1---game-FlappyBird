const db = require("../config/db");

module.exports = {
  createOrUpdate: (telegram_id, name, avatar, callback) => {
    // Sử dụng prepared statement để tránh SQL injection
    db.query(
      "SELECT * FROM users WHERE telegram_id = ?",
      [telegram_id],
      (err, rows) => {
        if (err) {
          return callback(err);
        }

        if (rows.length > 0) {
          // Cập nhật thông tin người dùng hiện có
          db.query(
            "UPDATE users SET name = ?, avatar = ? WHERE telegram_id = ?",
            [name, avatar, telegram_id],
            (updateErr) => {
              if (updateErr) return callback(updateErr);
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
          // Tạo người dùng mới
          db.query(
            "INSERT INTO users (telegram_id, name, avatar) VALUES (?, ?, ?)",
            [telegram_id, name, avatar],
            (insertErr) => {
              if (insertErr) return callback(insertErr);
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

  getById: (telegram_id, callback) => {
    db.query(
      "SELECT * FROM users WHERE telegram_id = ?",
      [telegram_id],
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]);
      }
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },
};
