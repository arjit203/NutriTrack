const connectDB = require("./config/db")  //database connection
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const nutritionRoutes = require('./routes/nutritionRoutes');
// const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import CORS


// Load environment variables
dotenv.config();
const bodyParser = require('express').json;
// app.use(bodyParser.json());


connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins
}));


// Nutrition API routes
app.use('/api/nutrition', nutritionRoutes);

app.use(express.urlencoded({ extended : false}))



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "FAILED",
        message: "An internal server error occurred"
    });
});
