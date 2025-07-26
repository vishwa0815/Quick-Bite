const express = require('express');
const fetchController = require('../controllers/foodItems.controller');
const router = express.Router();

router.post('/fetch',fetchController.fetchFoodItems); 

router.get('/get',fetchController.getFoodItems);

router.get('/meal-type/:mealType', fetchController.getFoodItemsByMealType);

router.get('/food/:id', fetchController.getFoodItemById);

module.exports = router;



