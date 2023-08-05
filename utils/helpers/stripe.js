const axios = require('axios')
const database = require('../../modules/database')
exports.initStripeHook = async (url,data,appId) => {
  console.log('IN HER')
  try { 
   let response =  await axios.post(url,data)
   console.log(response)
   database.deleteCron(appId)
  }catch(e) {
  //  database.deleteCron(data.appId)

    console.log(e)
    console.log(url)
    console.log("sdfsdf")
   }
}