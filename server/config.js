const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Rent-karo");

connect.then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection error:", error);
});

// Define the Login schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define the Product schema
const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_brand: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_image: {
        type: String, // This will store the path to the uploaded image
        required: true
    }
});

// Create models
const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("User", LoginSchema);

// Export models
module.exports = { Product, User };

