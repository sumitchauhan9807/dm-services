

const getpaymentLink = async (req,res,next) => {
  try{
    res.json({"link":"https://ecpay.com"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  getpaymentLink
}