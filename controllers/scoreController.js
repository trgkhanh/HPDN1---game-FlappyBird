const Score = require("../models/scoreModel");
const Mission = require("../models/missionModel");
const UserMission = require("../models/userMissionModel");
const User = require("../models/userModel");

// Gửi điểm mới
const submitScore = (req, res) => {
  const { telegram_id, score } = req.body;

  // Kiểm tra thiếu thông tin
  if (!telegram_id || score == null) {
    return res
      .status(400)
      .json({ error: "Thiếu thông tin telegram_id hoặc score" });
  }

  // Kiểm tra xem điểm có phải là số hợp lệ không
  if (isNaN(score) || score < 0) {
    return res.status(400).json({
      error: "Điểm không hợp lệ. Điểm phải là số và không nhỏ hơn 0.",
    });
  }

  // Lưu điểm
  Score.save(telegram_id, score, (err) => {
    // Nếu có lỗi xảy ra trong quá trình lưu điểm

    if (err) {
      console.error("Lỗi khi lưu điểm:", err);
      return res.status(500).json({ error: "Lỗi khi lưu điểm" });
    }
    res.json({ message: "Lưu điểm thành công" });
  });
};

// Lấy bảng xếp hạng
const getLeaderboard = (req, res) => {
  Score.getTopScores((err, results) => {
    if (err) {
      console.error("Lỗi khi lấy bảng xếp hạng:", err);
      return res.status(500).json({ error: "Lỗi khi lấy bảng xếp hạng" });
    }
    res.json(results);
  });
};

// Lấy xếp hạng của người dùng
const getUserRanking = (req, res) => {
  const telegram_id = req.params.id;

  // Kiểm tra thiếu thông tin
  if (!telegram_id) {
    return res.status(400).json({ error: "Thiếu thông tin telegram_id" });
  }

  Score.getUserRanking(telegram_id, (err, result) => {
    if (err) {
      console.error("Lỗi khi lấy xếp hạng người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi lấy xếp hạng người dùng" });
    }
    res.json(result);
  });
};

// Cập nhật tiến độ nhiệm vụ của người dùng
const updateUserMissionProgress = (req, res) => {
  const { userId, missionIds } = req.body;

  if (!userId || !Array.isArray(missionIds) || missionIds.length === 0) {
    return res.status(400).json({ error: "Thiếu userId hoặc missionIds" });
  }

  // Giả sử Mission.getCreatedAt nhận missionId và trả về createdAt cho từng mission
  let results = [];
  let errors = [];

  let processed = 0;
  missionIds.forEach((missionId) => {
    Mission.getCreatedAt(missionId, (err, missionCreatedAt) => {
      if (err || !missionCreatedAt) {
        errors.push({
          missionId,
          error: err ? err.message : "Không tìm thấy nhiệm vụ",
        });
        checkDone();
        return;
      }
      Score.getTotalScoreSinceMissionStart(
        userId,
        missionCreatedAt,
        (err, totalScore) => {
          if (err) {
            errors.push({ missionId, error: err.message });
            checkDone();
            return;
          }
          UserMission.updateProgress(userId, missionId, totalScore, (err) => {
            if (err) {
              errors.push({ missionId, error: err.message });
            } else {
              results.push({ missionId, progress: totalScore });
            }
            checkDone();
          });
        }
      );
    });
  });

  function checkDone() {
    processed++;
    if (processed === missionIds.length) {
      res.json({ updated: results, errors });
    }
  }
};

module.exports = {
  submitScore,
  getLeaderboard,
  getUserRanking,
  updateUserMissionProgress,
};
