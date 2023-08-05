const Joi = require("@hapi/joi");




const login = Joi.object({
  price: Joi.string().required(),
  webhookMeta:Joi.object().required(),
  hash:Joi.string().required()
});


module.exports = {
  login
}