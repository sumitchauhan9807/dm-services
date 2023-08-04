const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const { login }  = require('./validations')


router.post('/get-payment-link',(req, res, next) => {
  const validator = login.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.getpaymentLink)











module.exports = router;
