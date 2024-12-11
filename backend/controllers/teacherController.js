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

const getRat = (req, res) => {
  const query = `
   SELECT 
    t.id AS teacher_id,
    t.name AS teacher_name,
    c.id AS course_id,
    c.name AS course_name,
    s.id AS semester_id,
    s.name AS semester_name,
    r.clarity,
    r.engagement,
    r.content,
    r.descriptive AS comment
FROM 
    teacher t
JOIN 
    course c ON t.id = c.teacher_id
JOIN 
    rating r ON c.id = r.course_id
JOIN 
    semester s ON c.semester_id = s.id
WHERE 
    t.id = ?; -- Replace '?' with the teacher ID for whom you want to see individual ratings.

  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

module.exports = { getRat, getTeachers };