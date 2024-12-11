const db = require('../config/db');

const getTopRatedTeachers = (req, res) => {
  const query = `
    SELECT teacher.id, teacher.name, 
      AVG((rating.clarity + rating.engagement + rating.content) / 3) AS average_rating
    FROM teacher
    LEFT JOIN course ON teacher.id = course.teacher_id
    LEFT JOIN rating ON course.id = rating.course_id
    GROUP BY teacher.id
    ORDER BY average_rating DESC
    LIMIT 5;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top-rated teachers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

const getTopRatedCourses = (req, res) => {
  const query = `
    SELECT course.id, course.name, course.course_code, course.semester, 
      AVG((rating.clarity + rating.engagement + rating.content) / 3) AS average_rating
    FROM course
    LEFT JOIN rating ON course.id = rating.course_id
    GROUP BY course.id, course.semester
    ORDER BY average_rating DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top-rated courses:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

module.exports = { getTopRatedTeachers, getTopRatedCourses };
