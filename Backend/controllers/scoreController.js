const Score = require('../models/scoreModel');

// Gửi điểm mới
const submitScore = (req, res) => {
  const { telegram_id, score } = req.body;

  if (!telegram_id || score == null) {
    return res.status(400).json({ error: 'Thiếu thông tin telegram_id hoặc score' });
  }

  Score.save(telegram_id, score, (err) => {
    if (err) {
      console.error('Lỗi khi lưu điểm:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu điểm' });
    }
    res.json({ message: 'Lưu điểm thành công' });
  });
};

// Lấy bảng xếp hạng
const getLeaderboard = (req, res) => {
  Score.getTopScores((err, results) => {
    if (err) {
      console.error('Lỗi khi lấy bảng xếp hạng:', err);
      return res.status(500).json({ error: 'Lỗi khi lấy bảng xếp hạng' });
    }
    res.json(results);
  });
};

module.exports = {
  submitScore,
  getLeaderboard,
};
