// /controllers/teacherController.js
const db = require('../config/db');

const getTeachers = (req, res) => {
  const query = `
    SELECT teacher.id, teacher.name, 
      AVG(rating.clarity + rating.engagement + rating.content) / 3 AS avg_rating
    FROM teacher
    LEFT JOIN course ON teacher.id = course.teacher_id
    LEFT JOIN rating ON course.id = rating.course_id
    GROUP BY teacher.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

module.exports = { getTeachers };
