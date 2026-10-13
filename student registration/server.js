const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Read form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/student_registration")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Student Schema
const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

// Handle registration
app.post("/register", async function (req, res) {

    try {

        const student = new Student({
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            course: req.body.course,
            address: req.body.address
        });

        await student.save();

        console.log("1 record inserted");

        res.send("Registration Successful");

    } catch (err) {

        console.log(err);
        res.send("Database Error");

    }

});

// Handle login
app.post("/login", async function (req, res) {

    try {

        const email = req.body.email;
        const password = req.body.password;

        const student = await Student.findOne({
            email: email,
            password: password
        });

        if (student) {

            console.log("Login successful");

            res.send("Login Successful");

        } else {

            console.log("Invalid login");

            res.send("Invalid Email or Password");

        }

    } catch (err) {

        console.log(err);
        res.send("Database Error");

    }

});

// Start server
app.listen(3000, function () {

    console.log("Server running at http://localhost:3000");

});