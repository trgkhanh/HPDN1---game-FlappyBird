const Mission = require('../models/missionModel');

exports.getAllMissions = (req, res) => {
  Mission.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getMissionById = (req, res) => {
  Mission.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
    res.json(result[0]);
  });
};

exports.createMission = (req, res) => {
  Mission.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Tạo nhiệm vụ thành công', id: result.insertId });
  });
};

exports.updateMission = (req, res) => {
  Mission.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cập nhật nhiệm vụ thành công' });
  });
};

exports.deleteMission = (req, res) => {
  Mission.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xóa nhiệm vụ thành công' });
  });
};
