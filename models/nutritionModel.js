const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
  name: { type: String, required: true },
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  vitamins: [String],
  minerals: [String],
});

const ingredients  = mongoose.model('Nutrition', nutritionSchema);
module.exports=ingredients;