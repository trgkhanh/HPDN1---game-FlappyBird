const UserMission = require('../models/userMissionModel');

//  Lấy danh sách nhiệm vụ theo telegram_id
exports.getUserMissions = (req, res) => {
  const { telegram_id } = req.params;
  const userId = parseInt(telegram_id); // 👈 Ép kiểu số để tránh lỗi so sánh

  UserMission.getByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi truy vấn nhiệm vụ' });
    res.json(results);
  });
};

//  Gán nhiệm vụ mới cho user
exports.assignMission = (req, res) => {
  const { telegram_id, mission_id } = req.body;

  if (!telegram_id || !mission_id) {
    return res.status(400).json({ error: 'Thiếu telegram_id hoặc mission_id' });
  }

  const userId = parseInt(telegram_id);

  UserMission.assign(userId, mission_id, (err) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi gán nhiệm vụ' });
    res.json({ message: 'Gán nhiệm vụ thành công' });
  });
};

//  Đánh dấu nhiệm vụ hoàn thành
exports.completeMission = (req, res) => {
  const { telegram_id, mission_id } = req.body;

  if (!telegram_id || !mission_id) {
    return res.status(400).json({ error: 'Thiếu telegram_id hoặc mission_id' });
  }

  const userId = parseInt(telegram_id);

  UserMission.complete(userId, mission_id, (err) => {
    if (err) return res.status(500).json({ error: 'Lỗi cập nhật trạng thái nhiệm vụ' });
    res.json({ message: 'Đã hoàn thành nhiệm vụ' });
  });
};
