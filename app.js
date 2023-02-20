//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended:true
}));

main().catch((err)=>console.log(err));
async function main(){
mongoose.connect("mongodb://127.0.0.1/userDB")
}

app.get("/",function(req,res) {
    res.render("home");
    
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

 
const userSchema =new mongoose.Schema({
    email: String,
    password: String
});


// we hide this line of code using .env File (For this we should cut this line of code and past it inside .env).

// const secret = "Thisisourelittesecret.";

userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields: ["password"]});

const User = mongoose.model("User",userSchema);

app.post("/register",function(req,res){
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    });
});






app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;




User.findOne({email: username},function(err,foundUser){
    if(err){
        console.log(err);
    }
    else{
        if(foundUser){
            if(foundUser.password === password){
                res.render("secrets");
            }
        }
    }
});
});







app.listen(3000,function() {
    console.log("server started on port 3000.");  
});






















// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBWBys0KA9LQSMP8QkHT0dkkpOMX5DWxCs",
//   authDomain: "rehantodolist.firebaseapp.com",
//   projectId: "rehantodolist",
//   storageBucket: "rehantodolist.appspot.com",
//   messagingSenderId: "579443844669",
//   appId: "1:579443844669:web:397952f1de800c4474ec54",
//   measurementId: "G-WE7BF0TYEK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);