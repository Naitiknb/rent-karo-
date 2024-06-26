const express = require('express');
const path = require('path');
const collection = require('./config'); // Assuming this exports your Mongoose model 'User'
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../'))); // Serve files from root directory for index.html and index.css

// Define routes
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/login/login.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/signup/signup.html'));
});

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Assuming 'collection' is your User model from config.js
        const userData = await collection.create({
            name: username,
            email: email,
            password: hashedPassword // Store hashed password in the database
        });

        console.log("User created successfully:", userData);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await collection.findOne({ name: username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }

        // If password matches, redirect to the main page
        res.redirect('/');
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// Connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/Rent-karo")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
