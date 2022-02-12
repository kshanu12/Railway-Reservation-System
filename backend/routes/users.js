// const express=require("express");
// const router=express.Router();
// const db = require("../config/database")
// const User=require("../models/user")

// router.get("/",(req,res)=>{
//     User.findAll()
//     .then(users=>{
//         res.render("user",{
//             users
//         })
//     })
//     .catch(err=>console.log("error "+err))
// });

// router.get("/add",(req,res)=>res.render("/add"))

// router.post("/add",(req,res)=>{

//     let {name,email,password,age,gender,mobile}=req.body;

//     User.create({
//         name,email,password,age,gender,mobile
//     })
//     .then(user=> res.redirect("/users"))
//     .catch(err=>console.log(err))

// })

// module.exports=router; 


