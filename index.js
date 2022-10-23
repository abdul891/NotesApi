const express = require('express');
const noterouter = require('./routes/noteroutes');
const userrouter = require('./routes/userroutes')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 8081;
dotenv.config();
app.use(express.json());
app.use(cors());

app.use((req, res, next)=>{
  console.log("HTTP Method " + req.method + " URL " + req.url);
  next();
});
app.use("/user", userrouter);
app.use("/notes", noterouter);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my notes</h1>');
})
//console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})
.catch((err)=>{
    console.log(err);
})
