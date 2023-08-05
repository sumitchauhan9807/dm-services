"use strict";
const express = require("express");
const router = express.Router();
const {getApp} = require('../utils/appsManager') 
//user authentication and redirection
router.use(async (req, res, next) => {
  try {
    console.log(req.headers)
    let token = req.headers["apptoken"] ? req.headers["apptoken"] : null;
    
    if(!token) return next({ status: 422, message: "[apptoken] in HEADERS is required" });
    let app = getApp(token)
    if(!app) return next({ status: 422, message: "App token is incorrect" });
    req.appManager = app
    return next()
    // return next({ status: 401, message: "Authentication failed" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
