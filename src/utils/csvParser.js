const fs = require("fs");
const path = require("path");
const csv = require("csv-parser"); // npm install csv-parser

const csvFilePath = path.join(__dirname, "../../data/nutritionData.csv"); // Path to your CSV file

// Function to parse the CSV and return data as an array of objects
const fetchDataFromCSV = (foodName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    console.log("Reading CSV file from:", csvFilePath); // Debug log

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        if (
          foodName &&
          row.food &&
          row.food.trim().toLowerCase() === foodName.trim().toLowerCase()
        ) {
          results.push(row);
        }
      })
      .on('end', () => {
        if (results.length === 0) {
            console.log("Food item not found in CSV:", foodName);
            reject(new Error('Food item not found in CSV'));
        } else {
            console.log("Food item found in CSV:", results[0]);
            resolve(results[0]); // Return the first matching item
        }
    })
    .on('error', (error) => {
        console.error("Error reading CSV:", error.message);
        reject(error);
    });
});
};

module.exports = fetchDataFromCSV;
