const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Read form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML files
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to MySQL");
});

// Handle form submission
app.post("/register", function(req, res){

    const fullname = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const course = req.body.course;
    const address = req.body.address;

    const sql = `
    INSERT INTO student
    (fullname,password,email,phone,gender,course,address)
    VALUES (?,?,?,?,?,?,?)
    `;

    con.query(
        sql,
        [fullname,password,email,phone,gender,course,address],
        function(err,result){

            if(err) throw err;

            console.log("1 record inserted");

            res.send("Registration Successful");
        }
    );

});

app.listen(3000,function(){

    console.log("Server running at http://localhost:3000");

});