const db = require("../config/db");

module.exports = {
  // Tạo bảng missions cho user nếu chưa tồn tại
  createUserMission: (userId, missionId, target, callback) => {
    db.execute(
      `INSERT INTO user_missions (user_id, mission_id, progress, completed, claimed, target) VALUES (?, ?, 0, FALSE, FALSE, ?)`,
      [userId, missionId, target],
      (err) => {
        if (err) {
          console.error("Lỗi khi tạo user mission:", err);
          return callback(err);
        }
        callback(null);
      }
    );
  },

  getUserMissions: (userId, callback) => {
    db.execute(
      `SELECT um.*, m.name, m.description, m.reward_gold, m.daily 
       FROM user_missions um
       JOIN missions m ON um.mission_id = m.id
       WHERE um.user_id = ?`,
      [userId],
      (err, missions) => {
        if (err) {
          console.error("Lỗi khi lấy user missions:", err);
          return callback(err);
        }
        callback(null, missions);
      }
    );
  },

  updateUserMissionProgress: (user_id, mission_id, cb) => {
    if (user_id === undefined || mission_id === undefined) {
      return cb(new Error("userId hoặc missionId bị undefined"));
    }
    // Lấy thời gian tạo mission cho user
    db.execute(
      "SELECT completed_at FROM user_missions WHERE user_id = ? AND mission_id = ?",
      [user_id, mission_id],
      (err, rows) => {
        if (err || !rows.length) {
          console.error("Lỗi khi lấy thời gian tạo mission:", err);
          return cb(err || new Error("Không tìm thấy user_mission"));
        }
        const createdAt = rows[0].completed_at;

        // Tính tổng điểm từ thời gian tạo mission
        db.execute(
          "SELECT SUM(score) AS totalScore FROM scores WHERE telegram_id = ? AND created_at >= ?",
          [user_id, createdAt],
          (err, scoreRows) => {
            if (err) {
              console.error("Lỗi khi tính tổng điểm:", err);
              return cb(err);
            }
            const totalScore = scoreRows[0].totalScore || 0;

            // Cập nhật progress
            db.execute(
              "UPDATE user_missions SET progress = ? WHERE user_id = ? AND mission_id = ?",
              [totalScore, user_id, mission_id],
              (err) => {
                if (err) {
                  console.error("Lỗi khi cập nhật progress:", err);
                  return cb(err);
                }
                cb(null, totalScore);
              }
            );
          }
        );
      }
    );
  },

  claimReward: (userId, missionId, cb) => {
    db.execute(
      `SELECT um.completed, um.claimed, m.reward_gold FROM user_missions um
       JOIN missions m ON um.mission_id = m.id
       WHERE um.user_id = ? AND um.mission_id = ?`,
      [userId, missionId],
      (err, userMission) => {
        if (err) {
          console.error("Lỗi khi lấy user mission:", err);
          return cb(err);
        }

        if (userMission.length > 0) {
          const userMissionData = userMission[0];
          if (userMissionData.completed && !userMissionData.claimed) {
            db.execute(
              `UPDATE user_missions SET claimed = TRUE WHERE user_id = ? AND mission_id = ?`,
              [userId, missionId],
              (err) => {
                if (err) {
                  console.error("Lỗi khi cập nhật claimed:", err);
                  return cb(err);
                }
                cb(null, userMissionData.reward_gold);
              }
            );
          } else {
            cb(new Error("Nhiệm vụ chưa hoàn thành hoặc đã nhận thưởng"));
          }
        } else {
          cb(new Error("Không tìm thấy User Mission"));
        }
      }
    );
  },
};
