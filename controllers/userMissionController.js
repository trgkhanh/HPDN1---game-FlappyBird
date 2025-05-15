const userMissionModel = require("../models/userMissionModel");

module.exports = {
  getUserMissions: (req, res) => {
    userMissionModel.getUserMissions(req.params.userId, (err, userMissions) => {
      if (err) {
        console.error("Lỗi khi lấy user missions:", err);
        return res
          .status(500)
          .json({ error: "Không thể lấy danh sách nhiệm vụ của người dùng" });
      }
      res.json(userMissions);
    });
  },

  updateProgress: (req, res) => {
    const { userId, missionId, progress } = req.body;
    userMissionModel.updateProgress(userId, missionId, progress, (err) => {
      if (err) {
        console.error("Lỗi khi cập nhật tiến trình:", err);
        return res
          .status(500)
          .json({ error: "Không thể cập nhật tiến trình nhiệm vụ" });
      }
      res.json({ message: "Tiến trình nhiệm vụ được cập nhật thành công" });
    });
  },

  claimReward: (req, res) => {
    const { userId, missionId } = req.body;
    userMissionModel.claimReward(userId, missionId, (err, reward) => {
      if (err) {
        console.error("Lỗi khi nhận thưởng:", err);
        if (err.message === "Nhiệm vụ chưa hoàn thành hoặc đã nhận thưởng") {
          return res.status(400).json({ error: err.message });
        } else if (err.message === "Không tìm thấy User Mission") {
          return res.status(404).json({ error: err.message });
        }
        return res.status(500).json({ error: "Không thể nhận thưởng" });
      }
      res.json({ message: "Nhận thưởng thành công", reward });
    });
  },

  createUserMission: (req, res) => {
    const { userId, missionId } = req.body;
    userMissionModel.createUserMission(userId, missionId, (err) => {
      if (err) {
        console.error("Lỗi khi tạo user mission:", err);
        return res.status(500).json({ error: "Không thể tạo user mission" });
      }
      res.status(201).json({ message: "User mission được tạo thành công" });
    });
  },
};