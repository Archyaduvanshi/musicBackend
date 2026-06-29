const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registeruser(req,res){
    const  {username, email, password, role}= req.body;
    const isuseralreadyexists = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(isuseralreadyexists){
        return res.status(409).json({
            message : "User already exists"
        })
         }

    const hash = await bcrypt.hash(password,10)     
        
    const user = await userModel.create({
        username,
        email,
        password :hash, 
        role});

    const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

    res.cookie("token", token);  

    res.status(201).json({
        message: "user registered successfuly",
        user:{
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
    
}

async function loginuser(req,res){
    const {username, email, password} =req.body;
    const user = await userModel.findOne({
        $or:[{username},{email}]
    });

    if(!user){
        return res.status(401).json({message: "user not found"})
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password);
    
    if(!ispasswordvalid){
        return res.status(401).json({message:"invalid password credential"})
    }

     const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

    res.cookie("token", token);  

    res.status(200).json({
        message: "user login successfuly",
        user:{
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

async function logoutuser(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"user logout successfuly"})
}


module.exports = {registeruser, loginuser,logoutuser};