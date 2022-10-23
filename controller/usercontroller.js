
const usermodel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

//console.log(SECRET_KEY);

const singup = async (req, res)=>{
const{username , email, password} = req.body;
try{
const exitingUser = await usermodel.findOne({email : email});
if(exitingUser){
    return res.status(400).json({message:"user aleready exit"});
}
const hashpswd = await bcrypt.hash(password , 10);
const resultdata = await usermodel.create(
    {
        username : username,
        email:email,
        password:hashpswd
    }
);
const jwttoken =  jwt.sign({email : resultdata.email , id:resultdata._id}, SECRET_KEY);

res.status(201).json({user:resultdata,token:jwttoken});
}
catch(err){
console.log(err);
res.status(500).json({message : "something went wrong"});
}
}

const singin = async (req, res)=>{
    const{email, password} = req.body;
try{
    const exitingUser = await usermodel.findOne({email : email});
    if(!exitingUser){
        return res.status(404).json({message:"User not found"});
    }
    const matchpswd = await bcrypt.compare(password , exitingUser.password);
    if(!matchpswd){
        return res.status(400).json({message : "wrong password"});
    }
    const jwttoken =  jwt.sign({email : exitingUser.email , id:exitingUser._id}, SECRET_KEY);
res.status(200).json({user:exitingUser, token:jwttoken});
}
catch(err){
console.log(err);
res.status(500).json({message : "something went wrong"});
}
}

module.exports = {singup , singin};