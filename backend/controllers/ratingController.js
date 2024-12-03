// /controllers/ratingController.js
const db = require('../config/db');

const submitRating = (req, res) => {
  const { course_id, clarity, engagement, content, descriptive } = req.body;
  
  const query = `
    INSERT INTO rating (course_id, clarity, engagement, content, descriptive, student_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const student_id = 1; // Use the logged-in student's ID here (for demo purposes, using a static ID)

  db.query(query, [course_id, clarity, engagement, content, descriptive, student_id], (err, result) => {
    if (err) {
      console.error('Error submitting rating:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Rating submitted successfully' });
  });
};

module.exports = { submitRating };
