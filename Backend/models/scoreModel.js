const db = require('../config/db');

const Score = {
  // Lưu điểm mới
  save: (telegramId, score, cb) => {
    db.query(
      `INSERT INTO scores (telegram_id, score) VALUES (?, ?)`,
      [telegramId, score],
      cb
    );
  },

  // Lấy top điểm cao nhất
  getTopScores: (cb) => {
    db.query(
      `
      SELECT u.name, s.score, s.created_at
      FROM scores s
      JOIN users u ON u.telegram_id = s.telegram_id
      ORDER BY s.score DESC
      LIMIT 10
    `,
      cb
    );
  }
};

module.exports = Score;
