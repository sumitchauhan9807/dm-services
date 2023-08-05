const Stripe = require('stripe')
const database = require('../../modules/database')
const {getApp} = require('../../utils/appsManager') 
const initStripeHook = require('../../utils/helpers/stripe').initStripeHook
const stripeHook = async (req,res,next) => {
  try{
    
    let requestBody = req.body;
    let postData = JSON.parse(requestBody.toString())
    if(postData.type == 'checkout.session.completed') {
      let appData = getApp(postData?.data?.object?.client_reference_id)
      
      if(!appData) {
        return res.status(200).json({message:"app not found"})
      }

      const webhookSecret = appData.stripeMeta.webhookSecret;
      const sig = req.headers['stripe-signature'];

      let event;
    
      try {
        let stripe = Stripe(appData.getStripeCredentials('dev').secret)
        // let stripe = Stripe('sk_test_zXvwMLsLPNO2j2Z5spUc6aAx00nbIWVAPm')

        
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        // console.log(event)
        let toSaveData = {
          appId:postData?.data?.object?.client_reference_id,
          webhookData:event
        }
        await database.createCron(toSaveData)
        initStripeHook(appData.stripeMeta.webhookUrl,event,postData?.data?.object?.client_reference_id)
        console.log("============================================ sending success res ================================================")
        res.status(200).send('webhook success')
      } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }else {
      res.json({message:'asd',url:req.originalUrl})

    }
      
    
    
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  stripeHook
}

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const webhookSecret = "whsec_847046237bf5f80410cfe41214d769172acb5f5eef4d6d39a653541b8d801c88";

// router.post('/', express.raw({type: 'application/json'}), async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//   } catch (err) {
//     // On error, log and return the error message
//     console.log(`❌ Error message: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     if(event.type ==  'checkout.session.completed') {
//       // console.log('✅ Success:', event);
//       switch (event.data.object.metadata.transctionType) {
//         case 'mazu_purchase':
//           let metaData = event.data.object.metadata
//           await updateUserAccountPaymentStatus(metaData)
//           await addPremiumThemes(metaData.accountId)
//           await addPaymentMethods(metaData.accountId)
//           await makePaymentEntry({description:"Mazu puchased",model:'Mazu',mode:'stripe'},event.data.object)
//         break;
//         case 'mazu_product_purchase':
//           console.log(event.data.object)
//           let metaDataProduct = event.data.object.metadata
//           await addUserProduct(metaDataProduct)
//           await makePaymentEntryProduct({description:"Product puchased",model:metaDataProduct.productType,mode:'stripe'},event.data.object)
//         break;
//         default:
//           text = "Looking forward to the Weekend";
//       }
//     }
//      res.json({received: true});
//   } catch(e) {
//     res.status(500).json({received: false});
//   }
  
// });