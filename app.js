const express = require('express');
const app = express();

require("dotenv").config();
// const bodyParser = require("body-parser");
// var cors = require("cors");





app.get('/',(req,res,next)=>{
  res.json({message:"ecpay service here"})
})

app.listen('2000',()=>{
  console.log("Listening at 2000")
})