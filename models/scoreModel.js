const db = require("../config/db");

const Score = {
  // Lưu điểm mới và cập nhật bảng xếp hạng nếu điểm cao hơn
  save: (telegramId, score, cb) => {
    db.query(
      `INSERT INTO scores (telegram_id, score) VALUES (?, ?)`,
      [telegramId, score],
      (err, result) => {
        if (err) {
          return cb(err);
        }

        db.query(
          `
            UPDATE users
            SET high_score = ?
            WHERE telegram_id = ? AND (high_score IS NULL OR ? > high_score)
         `,
          [score, telegramId, score],
          (err, result) => {
            if (err) {
              return cb(err);
            }
            cb(null, result);
          }
        );
      }
    );
  },

  // Lấy top 10 bảng xếp hạng người chơi có điểm cao nhất
  getTopScores: (cb) => {
    db.query(
      `
        SELECT telegram_id, name, avatar, high_score AS score
        FROM users
        WHERE high_score IS NOT NULL
        ORDER BY high_score DESC
        LIMIT 10
      `,
      (err, results) => {
        if (err) {
          return cb(err);
        }
        cb(null, results);
      }
    );
  },

  // Lấy bảng xếp hạng của người chơi theo ID/ nhan diem cao nhat cua ho
  getUserRanking: (telegramId, cb) => {
    db.query(
      `
        SELECT high_score
        FROM users
        WHERE telegram_id = ?
      `,
      [telegramId],
      (err, result) => {
        if (err) {
          return cb(err);
        }
        if (result.length === 0) {
          return cb(null, null);
        }
        cb(null, result[0].high_score);
      }
    );
  },

  getTotalScoreSinceMissionStart: (userId, missionCreatedAt, cb) => {
    db.query(
      `SELECT SUM(score) AS total_score
             FROM scores
             WHERE telegram_id = ? AND created_at >= ?`,
      [userId, missionCreatedAt],
      (err, result) => {
        if (err) {
          return cb(err);
        }
        // Nếu không có điểm nào sau thời điểm tạo nhiệm vụ, trả về 0
        const totalScore = result[0].total_score || 0;
        cb(null, totalScore);
      }
    );
  },
};

module.exports = Score;
