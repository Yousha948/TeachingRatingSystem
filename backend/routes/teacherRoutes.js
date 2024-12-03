// /routes/teacherRoutes.js
const express = require('express');
const { getTeachers } = require('../controllers/teacherController');
const router = express.Router();

router.get('/getAll', getTeachers);

module.exports = router;
