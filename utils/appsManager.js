//https://guidgenerator.com/online-guid-generator.aspx 
// id generator
const PRODUCTION = false
const appsMeta = [
  {
    appToken:'DDDD32CC-46A4-42F5-AA63-6E81BFFF28C4',
    services:['ecpay','stripe'],
    stripeMeta: {
      webhookUrl: PRODUCTION ? "https://dialogmakers-international.com/api/user/login" : "http://localhost:8087/api/public/stripe-hook",
      webhookSecret:'whsec_e6e7a160d97c77afaa6ffff1a0484493b84197ab3b03af34f0a1239ee09d1dd8',
      stripecredentials:{
        dev: {
          secret : 'sk_test_zXvwMLsLPNO2j2Z5spUc6aAx00nbIWVAPm',
        },
        live: {
          secret : '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',
        }
      },
    },
    getStripeCredentials(mode = 'live') {
      if(mode == 'dev') return  this.stripeMeta.stripecredentials.dev
      return  this.stripeMeta.stripecredentials.live
    }
  }
]

exports.getApp = (appToken) => {
  return appsMeta.find(app => app.appToken == appToken)
}
