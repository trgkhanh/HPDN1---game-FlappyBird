const missionModel = require("../models/missionModel");

module.exports = {
  createMission: (req, res) => {
    const { name, description, reward_gold, daily } = req.body;
    missionModel.createMission(
      { name, description, reward_gold, daily },
      (err, missionId) => {
        if (err) {
          console.error("Lỗi khi tạo nhiệm vụ:", err);
          return res.status(500).json({ error: "Không thể tạo nhiệm vụ" });
        }
        res.status(201).json({
          message: "Nhiệm vụ được tạo thành công",
          missionId: missionId,
        });
      }
    );
  },

  getAllMissions: (req, res) => {
    missionModel.getAllMissions((err, missions) => {
      if (err) {
        console.error("Lỗi khi lấy tất cả nhiệm vụ:", err);
        return res
          .status(500)
          .json({ error: "Không thể lấy danh sách nhiệm vụ" });
      }
      res.json(missions);
    });
  },

  getMissionById: (req, res) => {
    missionModel.getMissionById(req.params.id, (err, mission) => {
      if (err) {
        console.error("Lỗi khi lấy nhiệm vụ theo ID:", err);
        return res
          .status(500)
          .json({ error: "Không thể lấy thông tin nhiệm vụ" });
      }
      if (!mission) {
        return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
      }
      res.json(mission);
    });
  },

  updateMission: (req, res) => {
    const { name, description, reward_gold, daily } = req.body;
    missionModel.updateMission(
      req.params.id,
      { name, description, reward_gold, daily },
      (err, affectedRows) => {
        if (err) {
          console.error("Lỗi khi cập nhật nhiệm vụ:", err);
          return res.status(500).json({ error: "Không thể cập nhật nhiệm vụ" });
        }
        if (affectedRows === 0) {
          return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
        }
        res.json({ message: "Nhiệm vụ được cập nhật thành công" });
      }
    );
  },

  deleteMission: (req, res) => {
    missionModel.deleteMission(req.params.id, (err, affectedRows) => {
      if (err) {
        console.error("Lỗi khi xóa nhiệm vụ:", err);
        return res.status(500).json({ error: "Không thể xóa nhiệm vụ" });
      }
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
      }
      res.status(204).send();
    });
  },
};
