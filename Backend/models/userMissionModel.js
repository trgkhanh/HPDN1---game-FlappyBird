const db = require('../config/db');

const UserMission = {
  //  Lấy danh sách nhiệm vụ theo user_id
  getByUserId: (userId, callback) => {
    db.query(`
      SELECT um.*, m.name, m.description, m.reward_gold
      FROM user_missions um
      JOIN missions m ON um.mission_id = m.id
      WHERE um.user_id = ?
    `, [userId], callback);
  },

  //  Đánh dấu hoàn thành nhiệm vụ
  complete: (userId, missionId, callback) => {
    db.query(`
      UPDATE user_missions
      SET completed = true, completed_at = NOW()
      WHERE user_id = ? AND mission_id = ?
    `, [userId, missionId], callback);
  },

  //  Gán nhiệm vụ cho người dùng (nếu chưa có)
  assign: (userId, missionId, callback) => {
    db.query(`
      INSERT INTO user_missions (user_id, mission_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE user_id = user_id
    `, [userId, missionId], callback);
  }
};

module.exports = UserMission;
