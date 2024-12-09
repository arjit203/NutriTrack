const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const nutritionSchema = new Schema(
  {
    Food_Name: { type: String, required: true, unique: true, sparse: true },
    Calories: { type: Number },
    Fat: { type: Number },
    Carbs: { type: Number },
    Sugar: { type: Number },
    Protein: { type: Number },
    Dietary_fiber: { type: Number },
    Cholesterol: { type: Number },
    Iron: { type: Number },
    Nutri_Density: { type: Number },
  },{ timestamps: true }
);

const Nutrition = mongoose.model("Nutrition", nutritionSchema);
module.exports = Nutrition;
