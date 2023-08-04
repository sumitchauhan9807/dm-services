const ecpayRouter = require('../app/ecpay/router') 
const stripeRouter = require('../app/stripe/router') 


const ecpayMiddleware = require('../middlewares/ecpay');
const stripeMiddleware = require('../middlewares/stripe');





module.exports.initRoutes = (app) => {
  app.use("/api/ecpay/*", ecpayMiddleware);
  app.use("/api/ecpay", ecpayRouter);

  app.use("/api/stripe/*", stripeMiddleware);
  app.use("/api/stripe", stripeRouter);
};

