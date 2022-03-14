const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const Client_order = require('../models/exchange.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REGISTER AN ORDER 
router.post('/neworder', (req, res) => {
  const now = new Date()

  var id = 'ORDER-' + req.body.brand1 + '-' + Math.floor(Math.random() * 100000) + '-' + req.body.phone_number;

const client_orderData = {
  exchange_id: id, // To generate
  names: req.body.names,
  watch_to_exchange: req.body.watch_to_exchange,
  watch_to_exchange_price: req.body.watch_to_exchange_price,
  replaced_watch: req.body.replaced_watch,
  replaced_watch_price: req.body.replaced_watch_price,
  price_difference: req.body.price_difference,
  client_phone_number: req.body.client_phone_number,
  comment: req.body.comment,
  delivery_address: req.body.delivery_address,
  delivery_price: req.body.delivery_price,
  delivery_guy: req.body.delivery_guy,
  print_status: req.body.print_status,  
  delivery_status:'untouched',
  delivery_status_last_update: now,
  delivery_date: req.body.delivery_date,
  exchange_date: req.body.exchange_date,
  registration_date: now 
}
        Client_order.create(client_orderData)
          .then(client_order => {
            let token = jwt.sign(client_order.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })   
          })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// UPDATE ORDER PRINT STATUS IF 
router.put('/update-order/:exchange_id', (req, res)=>{

  const client_orderData = {
    names: req.body.names,
    client_phone_number: req.body.client_phone_number,
    delivery_address: req.body.delivery_address,
    watch_brand_and_model: req.body.watch_brand_and_model,
    watch_price: req.body.watch_price,
    delivery_price: req.body.delivery_price,
    comment: req.body.comment,
  }

      const id = req.params.exchange_id;

      Client_order.update(client_orderData, 
               { 
                 where: {
                    exchange_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
})

// UPDATE ORDER  
router.put('/update-print_status/:exchange_id', (req, res)=>{

  if(req.body.print_status == 'printed'){
    const postData = {
       print_status: 'printed',
       delivery_status: 'in-preparation'
      //  order_treatement: 'treated',
      } 
      const id = req.params.exchange_id;
      Client_order.update(postData, 
               { 
                 where: {
                    exchange_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }

  else {
    const postData = {
       print_status: 'something is wrong',
      } 
      const id = req.params.exchange_id;
      Client_order.update(postData,  
               { 
                 where: {
                    exchange_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  } 
})

// UPDATE ORDER DELIVERY STATUS IF 
router.put('/update-delivery_status/:exchange_id', (req, res)=>{

    const now = new Date()
  
    if(req.body.delivery_status == 'in-preparation'){
      const postData = {
        delivery_status: 'in-preparation',
         delivery_status_last_update: now
        }
        const id = req.params.exchange_id;
        Client_order.update(postData, 
                 { 
                   where: {
                      exchange_id: id
                    } 
                  }
                 ).then((client_order) => {
                   if(client_order){
                    res.status(200).json({msg:"updated succesfully"});
                   }
                   else {
                     res.send('client_order not found')
                   }
                 })
                 .catch(err => {
                  res.send('error: ' + err)
                })  
    }
    
    else if (req.body.delivery_status == 'in-delivery'){ ////////////////
      const postData = {
        delivery_status: 'in-delivery',
        delivery_status_last_update: now
       }
       const id = req.params.exchange_id;  
       Client_order.update(postData, 
                { 
                  where: {
                     exchange_id: id
                   } 
                 }
                ).then((client_order) => {
                  if(client_order){
                   res.status(200).json({msg:"updated succesfully"});
                  }
                  else {
                    res.send('client_order not found')
                  }
                })
                .catch(err => {
                 res.send('error: ' + err)
               })  
    }
  
    else if (req.body.delivery_status == 'delivered') {
      const postData = {
        delivery_status: 'delivered',
        payment_status: 'paid',
        delivery_status_last_update: now
        }
        const id = req.params.exchange_id;
        Client_order.update(postData, 
                 { 
                   where: {
                      exchange_id: id
                    } 
                  }
                 ).then((client_order) => {
                   if(client_order){
                    res.status(200).json({msg:"updated succesfully"});
                   }
                   else {
                     res.send('client_order not found')
                   }
                 })
                 .catch(err => {
                  res.send('error: ' + err)
                })  
    }  
  
    else if (!req.body.delivery_status) {
      const postData = {
        delivery_status: 'Something wrong',
        delivery_status_last_update: now
        }
        const id = req.params.exchange_id;
        Client_order.update(postData, 
                 { 
                   where: {
                      exchange_id: id
                    } 
                  }
                 ).then((client_order) => {
                   if(client_order){
                    res.status(200).json({msg:"updated succesfully"});
                   }
                   else {
                     res.send('client_order not found')
                   }
                 })
                 .catch(err => {
                  res.send('error: ' + err)
                })  
    } 
  
    else {
      const postData = {
        delivery_status: 'very strange behaviour',
        delivery_status_last_update: now
        }
        const id = req.params.exchange_id;
        Client_order.update(postData, 
                 { 
                   where: {
                      exchange_id: id
                    } 
                  }
                 ).then((client_order) => {
                   if(client_order){
                    res.status(200).json({msg:"updated succesfully"});
                   }
                   else {
                     res.send('Something went wrong')
                   }
                 })
                 .catch(err => {
                  res.send('error: ' + err)
                })  
    }  
  })


///////////////////////////////////////////////////////////////////////////////////// FETCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// GET UNTREATED ORDERS
router.get('/get-all-exchanges', (req, res, next)=>{
   
    Client_order.findAll({
      order: [
        ['registration_date', 'DESC'], // Sorts by id in descending order
    ],
    // attributes:['exchange_id','shopify_exchange_id', 'names','client_phone_number','delivery_address','watch_brand_and_model','order_date'],
    // where: {
    //   order_treatement: 'not-treated'
    // }

    })
    .then(client_order => {
        if (client_order) {
          res.json(client_order)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });


 
// GET ONE EXCHANGE

router.get('/get-one/:exchange_id', (req, res) => {
  const id = req.params.exchange_id;

  Client_order.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    }); 
}) 

module.exports = router