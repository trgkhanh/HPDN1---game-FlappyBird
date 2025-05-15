const pool = require("../config/db");

module.exports = {
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

  getAllMissions: (callback) => {
    pool.execute("SELECT * FROM missions", (err, missions) => {
      if (err) {
        console.error("Lỗi khi lấy tất cả nhiệm vụ:", err);
        return callback(err);
      }
      callback(null, missions);
    });
  },

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

  deleteMission: (id, callback) => {
    pool.execute("DELETE FROM missions WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa nhiệm vụ:", err);
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },
};
