const Joi = require("@hapi/joi");




const login = Joi.object({
  username: Joi.string().required().messages({
    'any.required':"請輸入使用者名稱"
  }),
  password:Joi.string().required().messages({
    "any.required" : "請輸入密碼"
  })
});


module.exports = {
  login
}