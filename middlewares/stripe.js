"use strict";
const express = require("express");
const router = express.Router();

//user authentication and redirection
router.use(async (req, res, next) => {
  try {
    console.log(req.get('origin'))
    console.log('STRIPE MIDDLEWARE')
    return next()
    // return next({ status: 401, message: "Authentication failed" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
