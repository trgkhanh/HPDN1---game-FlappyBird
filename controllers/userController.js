const User = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const BOT_TOKEN = "7718302067:AAHHhR-zW7Hc_4OvAqOTj_DVkN_jqWng1Gk"; // **Quan trọng: Thay bằng token bot của bạn!**
const JWT_SECRET = "YOUR_JWT_SECRET"; // **Quan trọng: Thay bằng secret key mạnh của bạn!**

// Hàm xác minh dữ liệu Telegram
function verifyTelegramData(query, botToken) {
  const { hash, ...data } = query;
  const secretKey = crypto.createHash("sha256").update(botToken).digest();
  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");
  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");
  return hmac === hash;
}

exports.authTelegramUser = async (req, res) => {
  const query = req.body; // Dữ liệu từ Telegram

  if (!verifyTelegramData(query, BOT_TOKEN)) {
    return res.status(401).json({ error: "Dữ liệu không hợp lệ từ Telegram." });
  }

  const { id: telegram_id, first_name: name, photo_url: avatar } = query; // Lấy dữ liệu từ query

  try {
    const user = await User.createOrUpdate(telegram_id, name, avatar);
    const token = jwt.sign({ telegram_id: user.telegram_id }, JWT_SECRET, {
      expiresIn: "1h",
    }); // Ví dụ: 1 giờ
    res.json({ message: "Đăng nhập thành công", user, token });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng nhập Telegram:", error);
    res.status(500).json({ error: "Lỗi hệ thống", details: error.message }); // Thêm chi tiết lỗi
  }
};

exports.getUserById = async (req, res) => {
  const telegram_id = req.params.id;

  try {
    const user = await User.getById(telegram_id);
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
    res.json(user);
  } catch (error) {
    console.error("Lỗi khi lấy người dùng theo ID:", error);
    res.status(500).json({ error: "Lỗi hệ thống", details: error.message }); // Thêm chi tiết lỗi
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả người dùng:", error);
    res.status(500).json({ error: "Lỗi hệ thống", details: error.message }); // Thêm chi tiết lỗi
  }
};
