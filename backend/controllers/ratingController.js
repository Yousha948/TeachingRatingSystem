// /controllers/ratingController.js
const db = require('../config/db');

const submitRating = (req, res) => {
  const { course_id, clarity, engagement, content, descriptive } = req.body;
  const student_id = req.user.user_id; // Safely access user_id

  console.log('Received data:', { course_id, clarity, engagement, content, descriptive, student_id });
  console.log(student_id);
  if (!course_id || !clarity || !engagement || !content || !student_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = "INSERT INTO rating (course_id, clarity, engagement, content, descriptive, user_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [Number(course_id), clarity, engagement, content, descriptive, student_id], (err, result) => {
    if (err) {
      console.error('Error submitting rating:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Rating submitted successfully' });
  });
};


module.exports = { submitRating };
