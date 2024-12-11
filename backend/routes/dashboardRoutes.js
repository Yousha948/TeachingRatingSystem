const express = require('express');
// const { authenticate } = require('../middleware/authenticate');
const { getTopRatedTeachers, getTopRatedCourses } = require('../controllers/dashboardController');
const router = express.Router();

// Endpoint to get top-rated teachers
router.get('/top-rated-teachers',getTopRatedTeachers);

// Endpoint to get top-rated courses
router.get('/top-rated-courses',  getTopRatedCourses);

module.exports = router;
