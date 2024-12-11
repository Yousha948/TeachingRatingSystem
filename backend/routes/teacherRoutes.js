// /routes/teacherRoutes.js
const express = require('express');
const { getTeachers, getRat } = require('../controllers/teacherController');
const db = require('../config/db');
const router = express.Router();

router.get('/getAll', getTeachers);
router.get('/getRat/:id',(req, res)=>{
    const id = req.params.id;
    const query = `
   SELECT 
    semester AS semester_id,
    c.id AS course_id,
    c.name AS course_name,
    r.clarity,
    r.engagement,
    r.content,
    r.descriptive AS comment,
    u.name AS student_name,
    t.name AS teacher_name
FROM 
    Teacher t
JOIN 
    Course c ON t.id = c.teacher_id
JOIN 
    Rating r ON c.id = r.course_id
JOIN 
    user u ON r.user_id = u.user_id
WHERE 
    t.id = ? -- Replace ? with the desired teacher's ID

ORDER BY 
    semester, c.name, r.timestamp;



  `;
  
  db.query(query,id, (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
})

module.exports = router;