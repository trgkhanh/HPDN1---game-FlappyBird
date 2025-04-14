const db = require('../config/db');

const User = {
  createOrUpdate: (id, name, avatar, callback) => {
    db.query(`
      INSERT INTO users (telegram_id, name, avatar)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)
    `, [id, name, avatar], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE telegram_id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
