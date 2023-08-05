const express = require('express');
const app = express();
const cronJob = require('./utils/cron')
require("dotenv").config();
// const bodyParser = require("body-parser");
// var cors = require("cors");


const bodyParser = require("body-parser");
app.use((req, res, next) => {
  if (req.originalUrl.includes('webhooks')) {
    next(); 
  } else {
    bodyParser.json()(req, res, next);
  }
});
const Routes = require("./routers");
Routes.initRoutes(app)

app.get('/',(req,res,next)=>{
  res.json({message:"ecpay service here"})
})



app.use(function (err, req, res, next) {
  // console.log(err)
  res.status(err.status || 500);
  res.json({
    code: err.code || 500,
    status: err.status || 500,
    message: err.message || "Something went wrong.",
  });
});


app.listen('2000',()=>{
  console.log("Listening at 2000")
  cronJob()
})