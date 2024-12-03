const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require('./config/db');

app.use(cors());

app.use(bodyParser.json());


// Import routes
const authRoutes = require("./routes/auth");
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
// // Use routes
app.use("/auth", authRoutes);
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);
app.use("/ratings", ratingRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});