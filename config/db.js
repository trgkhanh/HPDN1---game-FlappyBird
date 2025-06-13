const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tqk050824",
  database: "game_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Kết nối CSDL thành công");
});

module.exports = db;
