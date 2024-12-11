const Nutrition = require("../models/nutritionModel"); // Import Nutrition model
const fetchDataFromCSV = require("../utils/csvParser"); // Import CSV parser

exports.getNutritionByItem = async (req, res) => {
  const { Food_Name } = req.body; // Retrieve food name from request body

  if (!Food_Name) {
    return res.status(400).json({ error: "Food item name is required" });
  }

  console.log("Received Food_Name:", Food_Name);

  try {
    const originalFoodName = Food_Name.trim(); // Keep the case as entered by the user

    // First,fetching from MongoDB database
    let foodItem = await Nutrition.findOne({ Food_Name: originalFoodName });
    console.log("Food item in DB:", foodItem); // Log DB result

    if (!foodItem) {
      // If the item is not found in MongoDB, fetch from CSV
      console.log("Item not found in DB, searching CSV...");
      const csvItem = await fetchDataFromCSV(originalFoodName.toLowerCase());
      //  console.log("Food item found in CSV:", csvItem); // Log CSV result

      if (!csvItem) {
        return res.status(404).json({
          error: `Food item "${Food_Name}" not found in our database or CSV records.`,
        });
      }

      // Check if the food item already exists in the database before saving (case insensitive)
      foodItem = await Nutrition.findOne({
        Food_Name: csvItem.food,
      });

      if (!foodItem) {
        // Save the CSV data to MongoDB if it doesn't already exist      const newFoodItem = new Nutrition({
        const newFoodItem = new Nutrition({
          Food_Name: originalFoodName,
          Calories: csvItem.Caloric_Value,
          Fat: csvItem.Fat,
          Carbs: csvItem.Carbohydrates,
          Sugar: csvItem.Sugars,
          Protein: csvItem.Protein,
          Dietary_fiber: csvItem.Dietary_Fiber,
          Cholesterol: csvItem.Cholesterol,
          Iron: csvItem.Iron,
          Nutri_Density: csvItem.Nutrition_Density,
        });

        // Save the new food item to the database
        await newFoodItem.save();
        foodItem = newFoodItem; // Now we have the saved item
        console.log("Food item saved to DB:", foodItem);
      } else {
        console.log("Food item already exists in DB, skipping save.");
      }
    }

    return res.status(200).json({
      data: {
        Food_Name: foodItem.Food_Name,
        Calories: foodItem.Calories,
        Fat: foodItem.Fat,
        Carbs: foodItem.Carbs,
        Sugar: foodItem.Sugar,
        Protein: foodItem.Protein,
        Dietary_fiber: foodItem.Dietary_fiber,
        Cholesterol: foodItem.Cholesterol,
        Iron: foodItem.Iron,
        Nutri_Density: foodItem.Nutri_Density,
      },
    });
    
    
  } catch (error) {
    console.error("Error fetching nutrition data:", error.message);
    return res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
};