// /routes/ratingRoutes.js
const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const router = express.Router();

router.post('/sumbit', submitRating);
module.exports = router;
