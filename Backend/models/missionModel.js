const db = require('../config/db');

const Mission = {
  getAll: (callback) => {
    db.query('SELECT * FROM missions', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM missions WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { name, description, reward_gold, daily } = data;
    db.query(
      'INSERT INTO missions (name, description, reward_gold, daily) VALUES (?, ?, ?, ?)',
      [name, description, reward_gold, daily],
      callback
    );
  },

  update: (id, data, callback) => {
    const { name, description, reward_gold, daily } = data;
    db.query(
      'UPDATE missions SET name = ?, description = ?, reward_gold = ?, daily = ? WHERE id = ?',
      [name, description, reward_gold, daily, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM missions WHERE id = ?', [id], callback);
  }
};

module.exports = Mission;
