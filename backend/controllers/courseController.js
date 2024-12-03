// /controllers/courseController.js
const db = require('../config/db');

const getCoursesBySemester = (req, res) => {
    const { semester } = req.query;
    const query = `
      SELECT course.id, course.name, course.course_code, teacher.name AS teacher_name
      FROM course
      JOIN teacher ON course.teacher_id = teacher.id
      WHERE course.course_code LIKE ?
    `;
  
    db.query(query, [`${semester}%`], (err, results) => {
      if (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  };

module.exports = { getCoursesBySemester };
