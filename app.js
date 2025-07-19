//Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Middleware to parse JSON bodies and allow cross origin requests
app.use(express.json());
app.use(cors());

//Default test route
app.get("/", (req, res) => {
    res.send("Running");
});

//Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDb Connected!");

        //Start the server only after DB Connection is ready
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log("Server Running at " + PORT);

        })
    })
    .catch((err) => {
        console.error("Failed to Connect MongoDB " + err.message);
    })