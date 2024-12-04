// /routes/courseRoutes.js
const express = require('express');
const { getCoursesBySemester } = require('../controllers/courseController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/:semester", getCoursesBySemester);
module.exports = router;
