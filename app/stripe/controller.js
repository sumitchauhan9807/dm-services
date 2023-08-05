const Stripe = require('stripe')


const getpaymentLink = async (req,res,next) => {
  try{
    let stripeCredentials = req.appManager.getStripeCredentials('dev')
    let appToken = req.appManager.appToken
    let stripe = Stripe(stripeCredentials.secret)
    const session = await stripe.checkout.sessions.create({
      success_url: "https://flirttool.com/success",
      cancel_url: "https://flirttool.com/error",
      client_reference_id: appToken,
      payment_method_types: ["card"],
      line_items: [{ price: req.body.price, quantity: 1 }],
      metadata: {... req.body.webhookMeta , hash:req.body.hash},
      mode: "payment",
    });
    res.json({
      url:session.url
    })
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  getpaymentLink
}

