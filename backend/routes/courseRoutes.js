// /routes/courseRoutes.js
const express = require('express');
const { getCoursesBySemester } = require('../controllers/courseController');
const router = express.Router();

router.get('/courses', getCoursesBySemester);

module.exports = router;
