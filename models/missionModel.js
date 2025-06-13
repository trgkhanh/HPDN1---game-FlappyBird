const pool = require("../config/db");

module.exports = {
  // Tạo một nhiệm vụ mới
  createMission: (mission, callback) => {
    const { name, description, reward_gold, daily } = mission;
    pool.execute(
      "INSERT INTO missions (name, description, reward_gold, daily) VALUES (?, ?, ?, ?)",
      [name, description, reward_gold, daily],
      (err, result) => {
        if (err) {
          console.error("Lỗi khi tạo nhiệm vụ:", err);
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  },

  // Lấy tất cả nhiệm vụ
  getAllMissions: (callback) => {
    pool.execute("SELECT * FROM missions", (err, missions) => {
      if (err) {
        console.error("Lỗi khi lấy tất cả nhiệm vụ:", err);
        return callback(err);
      }
      callback(null, missions);
    });
  },

  // Lấy nhiệm vụ theo ID
  getMissionById: (id, callback) => {
    pool.execute(
      "SELECT * FROM missions WHERE id = ?",
      [id],
      (err, mission) => {
        if (err) {
          console.error("Lỗi khi lấy nhiệm vụ theo ID:", err);
          return callback(err);
        }
        callback(null, mission[0] || null);
      }
    );
  },

  // Cập nhật nhiệm vụ
  updateMission: (id, mission, callback) => {
    const { name, description, reward_gold, daily } = mission;
    pool.execute(
      "UPDATE missions SET name = ?, description = ?, reward_gold = ?, daily = ? WHERE id = ?",
      [name, description, reward_gold, daily, id],
      (err, result) => {
        if (err) {
          console.error("Lỗi khi cập nhật nhiệm vụ:", err);
          return callback(err);
        }
        callback(null, result.affectedRows);
      }
    );
  },

  // Xóa nhiệm vụ theo ID
  deleteMission: (id, callback) => {
    pool.execute("DELETE FROM missions WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa nhiệm vụ:", err);
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  // Lấy created_at của tất cả nhiệm vụ
  getAllCreatedAt: function(callback) {
    pool.execute(
      "SELECT id, created_at FROM missions",
      (err, results) => {
        if (err) {
          console.error("Lỗi khi lấy created_at của tất cả nhiệm vụ:", err);
          return callback(err);
        }
        callback(null, results);
      }
    );
  },
};
