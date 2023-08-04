

const getpaymentLink = async (req,res,next) => {
  try{
    res.json({"link":"https://asdaasdasdasdasdasdsd.com"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  getpaymentLink
}