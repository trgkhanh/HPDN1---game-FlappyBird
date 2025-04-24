const Score = require('../models/scoreModel');

// Gửi điểm mới
const submitScore = (req, res) => {
  const { telegram_id, score } = req.body;

  // Kiểm tra thiếu thông tin
  if (!telegram_id || score == null) {
    return res.status(400).json({ error: 'Thiếu thông tin telegram_id hoặc score' });
  }

  // Kiểm tra xem điểm có phải là số hợp lệ không
  if (isNaN(score) || score < 0) {
    return res.status(400).json({ error: 'Điểm không hợp lệ. Điểm phải là số và không nhỏ hơn 0.' });
  }

  // Lưu điểm
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
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'Không có dữ liệu bảng xếp hạng' });
    }
    res.json(results);
  });
};

module.exports = {
  submitScore,
  getLeaderboard,
};
