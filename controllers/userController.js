const mongoose = require('mongoose');
const user = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const existingUser = await user.findOne({username: username});
        if(existingUser){
            return res.status(400).json("User already exists");
        }
        const newUser = new user({
            username: username,
            password: password
        });
        const savedUser = await newUser.save();
        res.status(201).json("Registration successful");
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const existingUser = await user.findOne({username: username});
        if(!existingUser){
            return res.status(404).json("User does not exist");
        }
        const isMatch = await existingUser.comparePassword(password);
        if(!isMatch){
            return res.status(400).json("Incorrect password");
        }
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET);
        res.status(200).json({token: token, userId: existingUser._id});
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}