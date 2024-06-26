const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/Rent-karo")

// connect.then(() => {
//     console.log("Database connected successfully");
// }).catch((error) => {
//     console.error("Database connection error:", error);
// });

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

const User = mongoose.model("user-auth-data", LoginSchema);

module.exports = User;
