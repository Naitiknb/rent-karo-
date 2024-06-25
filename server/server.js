const express = require('express');
const path = require('path');
const collection = require("./config"); // Assuming this exports your Mongoose model 'User'
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, '../')));

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

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
