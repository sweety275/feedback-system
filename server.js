
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const Feedback = require("./models/Feedback");

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static("public"));


app.post("/feedback", async (req, res) => {
    try {
        const feedback = new Feedback({
            name: req.body.name,
            rating: req.body.rating,
            comment: req.body.comment
        });

        await feedback.save();

        res.json({
            message: "Feedback saved successfully"
        });
    } catch (error) {
        console.error("Error saving feedback:", error);

        res.status(500).json({
            message: "Error saving feedback"
        });
    }
});


app.get("/feedback", async (req, res) => {
    try {
        const feedback = await Feedback.find();

        res.json(feedback);
    } catch (error) {
        console.error("Error getting feedback:", error);

        res.status(500).json({
            message: "Error getting feedback"
        });
    }
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    });
