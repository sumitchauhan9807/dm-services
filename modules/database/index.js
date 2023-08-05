const { JsonDB, Config }  = require('node-json-db');

const createCron = async (data) => {
  try {
    var db = new JsonDB(new Config("./modules/database/models/cron", true, false, '/'));
    await db.push("/webkookCrons[]",data);
    
  }catch(e) {
    console.log(e)
    throw Error(e) 
  }
}

const getAllCrons = async () => {
  try {
    var db = new JsonDB(new Config("./modules/database/models/cron", true, false, '/'));
    return await db.getData("/");

  }catch(e) {
    throw Error(e)
  }
}

const deleteCron = async (appToken) => {
  try {
    var db = new JsonDB(new Config("./modules/database/models/cron", true, false, '/'));
    let allCrons = await db.getData("/");
    
    let index = allCrons.webkookCrons.findIndex(c =>c.appId == appToken)
    console.log(index)
    if(index > -1) {
      await db.delete(`/webkookCrons[${index}]`)
    }
    return true
  }catch(e) {
    throw Error(e)
  }
}


module.exports =  {
  createCron,
  getAllCrons,
  deleteCron
}