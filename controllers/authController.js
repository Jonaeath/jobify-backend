const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

async function register(req,res){
const {name,email,password} = req.body;

try {
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({msg:"User already exists"});
    }

    user = new User({name,email,password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // JWT_SECRET from environment variable
    jwt.sign(
        payload,
        process.env.JWT_SECRET,{expiresIn: 3600},(err,token)=>{if(err) throw err; res.json({token})}
    )
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");    
};

};

async function login(req,res){
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({msg:"Invalid Credentials"});
    } 
    
    const payload = { user: {id: user.id}};

    // JWT_SECRET from environment variables
     jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3000}, (error, token)=>{
        if(error)throw error;
        res.json({token});
     })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = {register, login}