const mysql = require("mysql2");
const dotenv = require('dotenv')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YoushA2002@",
  database: "TeachingRatingSystem",
});

db.connect((err) => {
  if (err) {
    console.error("Database connect++ion failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;