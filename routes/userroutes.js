
const express = require('express');
const { singup, singin } = require('../controller/usercontroller');
const userrouter = express.Router();


userrouter.post("/signup", singup);

userrouter.post("/signin",singin);
/*userrouter.get("/details",(req ,res)=>{
    res.send("this is uesr get request")
});

userrouter.post("/details",(req ,res)=>{
    res.send("this is uesr post request")
});*/

module.exports = userrouter;