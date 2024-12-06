const apiClient = require('../utils/apiClient');
const Nutrition = require('../models/nutritionModel'); // Import Nutrition model
// Controller to fetch nutrition analysis
exports.getNutritionAnalysis = async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: 'Ingredients are required' });
        }

        const payload = {
            title: 'Custom Recipe',
            ingr: ingredients,
        };

        const response = await apiClient.post('/nutrition-details', payload, {
            params: {
                app_id: process.env.EDAMAM_APP_ID,
                app_key: process.env.EDAMAM_APP_KEY,
            },
        });

        // Extract the relevant data
        const nutritionData = response.data;
        const formattedData = {
            name: payload.title,
            calories: nutritionData.calories,
            protein: nutritionData.totalNutrients.PROCNT.quantity || 0,
            fat: nutritionData.totalNutrients.FAT.quantity || 0,
            carbs: nutritionData.totalNutrients.CHOCDF?.quantity || 0,
            vitamins: Object.keys(nutritionData.totalNutrients).filter((key) =>
                key.includes('VIT')),
            minerals: Object.keys(nutritionData.totalNutrients).filter((key) =>
                key.includes('CA') || key.includes('FE')),
        };

    // Save to MongoDB
        const newNutrition = new Nutrition(formattedData);
        await newNutrition.save();

         // Respond with the nutritional data
         res.status(201).json({
            message: 'Nutrition data fetched and saved successfully',
            data: formattedData,
        });

    } catch (error) {
        console.error('Error fetching nutrition analysis:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data.message || 'Error from Edamam API',
            });
        }
        res.status(500).json({ error: 'Failed to fetch nutrition analysis' });
    }
};
