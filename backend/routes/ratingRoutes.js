// /routes/ratingRoutes.js
const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/submit',authenticate, submitRating);
module.exports = router;
