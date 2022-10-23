const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY =process.env.SECRET_KEY;

const auth = (req, res, next)=>
{
try{
let token = req.headers.authorization; // token not defined
console.log("token = " + token);
if(token){
//token = token.split(" ")[1];

let user = jwt.verify(token, SECRET_KEY);
//console.log("token split=" + user.id);
req.userid = user.id;
req.useremail = user.email;
}
else{
    return res.status(401).json({message:"unauthorizes user"});
}
next();
//res.send("get next funcation");
}
catch(err){
    console.log("wrong token");
    res.status(401).json({message:"Wrong token"});
}
}
module.exports = {auth};