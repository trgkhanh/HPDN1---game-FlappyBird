const express = require('express');
const cors = require('cors');

const missionRoutes = require('./routes/missionRoutes');
const userMissionRoutes = require('./routes/userMissionRoutes');
const userRoutes = require('./routes/userRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Dùng express.json() thay body-parser

// Routes
app.use('/missions', missionRoutes);          // Nhiệm vụ chung
app.use('/user-missions', userMissionRoutes); // Nhiệm vụ của người dùng
app.use('/users', userRoutes);                // Người dùng (qua Telegram)
app.use('/scores', scoreRoutes);              // Điểm số

// Route mặc định
app.get('/', (req, res) => {
  res.send('🎮 API Game Bắn Gà đã sẵn sàng!');
});

// Xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).json({ error: 'Không tìm thấy đường dẫn này.' });
});

// Xử lý lỗi hệ thống
app.use((err, req, res, next) => {
  console.error('Lỗi hệ thống:', err.stack);
  res.status(500).json({ error: 'Đã xảy ra lỗi trên server.' });
});

// Khởi động server
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
