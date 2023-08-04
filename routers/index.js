const ecpayRouter = require('../app/ecpay/router') 




module.exports.initRoutes = (app) => {
  app.use("/api/ecpay", ecpayRouter);
};

