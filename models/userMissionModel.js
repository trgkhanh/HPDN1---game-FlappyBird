const db = require("../config/db");

module.exports = {
  createUserMission: (userId, missionId, callback) => {
    db.execute(
      "INSERT INTO user_missions (user_id, mission_id, progress, completed, claimed) VALUES (?, ?, 0, FALSE, FALSE)",
      [userId, missionId],
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

  updateProgress: (userId, missionId, progress, callback) => {
    db.execute(
      `SELECT * FROM user_missions WHERE user_id = ? AND mission_id = ?`,
      [userId, missionId],
      (err, userMission) => {
        if (err) {
          console.error("Lỗi khi lấy user mission:", err);
          return callback(err);
        }

        if (userMission.length > 0) {
          const userMissionData = userMission[0];
          let updatedProgress = progress;
          let completed = userMissionData.completed;

          db.execute(
            `SELECT target FROM missions WHERE id = ?`,
            [missionId],
            (err, mission) => {
              if (err) {
                console.error("Lỗi khi lấy mission target:", err);
                return callback(err);
              }
              const target = mission[0].target;
              if (updatedProgress >= target && !completed) {
                completed = true;
              }

              db.execute(
                `UPDATE user_missions 
                 SET progress = ?, completed = ?
                 WHERE user_id = ? AND mission_id = ?`,
                [updatedProgress, completed, userId, missionId],
                (err) => {
                  if (err) {
                    console.error("Lỗi khi cập nhật tiến trình:", err);
                    return callback(err);
                  }
                  callback(null);
                }
              );
            }
          );
        } else {
          callback(null); // Không tìm thấy user mission, coi như thành công
        }
      }
    );
  },

  claimReward: (userId, missionId, callback) => {
    db.execute(
      `SELECT um.completed, um.claimed, m.reward_gold FROM user_missions um
       JOIN missions m ON um.mission_id = m.id
       WHERE um.user_id = ? AND um.mission_id = ?`,
      [userId, missionId],
      (err, userMission) => {
        if (err) {
          console.error("Lỗi khi lấy user mission:", err);
          return callback(err);
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
                  return callback(err);
                }
                callback(null, userMissionData.reward_gold);
              }
            );
          } else {
            callback(new Error("Nhiệm vụ chưa hoàn thành hoặc đã nhận thưởng"));
          }
        } else {
          callback(new Error("Không tìm thấy User Mission"));
        }
      }
    );
  },
};
