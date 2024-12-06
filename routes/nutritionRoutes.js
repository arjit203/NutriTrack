const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

// Route to fetch nutrition analysis
router.post('/analyze', nutritionController.getNutritionAnalysis);

module.exports = router;
