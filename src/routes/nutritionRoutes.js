const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.post('/', (req, res) => {
    console.log(req.body);  // Log the request body
    nutritionController.getNutritionByItem(req, res);
  });
  

module.exports = router;
