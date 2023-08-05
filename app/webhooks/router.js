const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const { login }  = require('./validations')

router.post('/stripe', express.raw({type: 'application/json'}),Controller.stripeHook)







module.exports = router;
