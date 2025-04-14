const User = require('../models/userModel');

exports.authTelegramUser = (req, res) => {
  const { telegram_id, name, avatar } = req.body;

  User.createOrUpdate(telegram_id, name, avatar, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi hệ thống' });
    res.json({ message: 'Đăng nhập thành công', user: result });
  });
};

exports.getUserById = (req, res) => {
  const telegram_id = req.params.id;

  User.getById(telegram_id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi hệ thống' });
    if (!result) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(result);
  });
};
