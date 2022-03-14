const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const Client_order = require('../models/order.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REGISTER AN ORDER 
router.post('/neworder', (req, res) => {
  const now = new Date()

  var id = 'ORDER-' + req.body.watch_brand_and_model + '-' + Math.floor(Math.random() * 100000) + '-' + req.body.phone_number;

const client_orderData = {
  order_id: id, // To generate
  shopify_order_id: req.body.shopify_order_id,
  names: req.body.names,
  client_phone_number: req.body.client_phone_number,
  delivery_address: req.body.delivery_address,
  quantity: req.body.quantity,
  watch_brand_and_model: req.body.watch_brand_and_model,
  watch_price: req.body.watch_price,
  delivery_price: req.body.delivery_price,
  comment: req.body.comment,
//   delivery_guy: req.body.delivery_guy,
  order_treatement: 'not-treated',
//   order_status: 'not-treated',
//   order_status_last_update: now,
  delivery_status:'untouched',
  delivery_status_last_update: now,
  payment_status: 'unpaid',
  order_date: req.body.order_date,
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
router.put('/update-order/:order_id', (req, res)=>{

  const client_orderData = {
    names: req.body.names,
    client_phone_number: req.body.client_phone_number,
    delivery_address: req.body.delivery_address,
    watch_brand_and_model: req.body.watch_brand_and_model,
    watch_price: req.body.watch_price,
    delivery_price: req.body.delivery_price,
    comment: req.body.comment,
  }

      const id = req.params.order_id;

      Client_order.update(client_orderData, 
               { 
                 where: {
                    order_id: id
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
router.put('/update-print_status/:order_id', (req, res)=>{

  if(req.body.print_status == 'printed'){
    const postData = {
       print_status: 'printed',
       delivery_status: 'in-preparation'
      //  order_treatement: 'treated',
      } 
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
      const id = req.params.order_id;
      Client_order.update(postData,  
               { 
                 where: {
                    order_id: id
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

// UPDATE ORDER STATUS IF 
router.put('/update-order_status/:order_id', (req, res)=>{

  const now = new Date()

  if(req.body.order_status == 'unreachable'){
    const postData = {
       order_status: 'unreachable',
       order_treatement: 'treated',
       order_status_last_update: now

      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
  
  else if (req.body.order_status == 'reservation'){
    const postData = {
      order_status: 'reservation', 
      order_treatement: 'treated',
      delivery_date: req.body.delivery_date,
      order_status_last_update: now
     }
     const id = req.params.order_id;  
     Client_order.update(postData, 
              { 
                where: {
                   order_id: id
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
  
  else if  (req.body.order_status == 'confirmed') {
    const postData = {
       comment: req.body.comment,
      //  delivery_price: req.body.delivery_price,
       delivery_date: req.body.delivery_date,
       order_status: 'confirmed',
       order_treatement: 'treated',
       delivery_status: 'in-preparation',
       order_status_last_update: now
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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

  else  if  (req.body.order_status == 'cancelled') {
    const postData = {
       order_status: 'cancelled',
       order_treatement:"already-treated",
       order_status_last_update: now
      //  delivery_status: 'already-treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
       order_status: 'something is wrong',
       order_status_last_update: now
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
router.put('/update-delivery_status/:order_id', (req, res)=>{

  const now = new Date()


  if(req.body.delivery_status == 'in-preparation'){
    const postData = {
      delivery_status: 'in-preparation',
       delivery_status_last_update: now
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
     const id = req.params.order_id;  
     Client_order.update(postData, 
              { 
                where: {
                   order_id: id
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
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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

// UPDATE ORDER PAID STATUS
router.put('/update-payment_status/:order_id', (req, res)=>{

  if(req.body.payment_status == 'paid'){
    const postData = {
      payment_status: 'paid',
      //  order_treatement: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
      payment_status: 'very strange',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
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
router.get('/get-untreated', (req, res, next)=>{
   
    Client_order.findAll({
      order: [
        ['registration_date', 'DESC'], // Sorts by id in descending order
    ],
    // attributes:['order_id','shopify_order_id', 'names','client_phone_number','delivery_address','watch_brand_and_model','order_date'],
    where: {
      order_treatment: 'not-treated'
    }

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


 // GET UNAVAILABLE CLIENTS
router.get('/get-unavailable-clients', (req, res, next)=>{
   
  Client_order.findAll({
    order: [
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
    // attributes:['order_id','shopify_order_id', 'names','client_phone_number','delivery_address','watch_brand_and_model','order_date'],
    where: {
    order_treatement: 'treated',
    order_status: 'unavailable'
  }

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


// GET RESERVATIONS
router.get('/get-reservations', (req, res, next)=>{
   
  Client_order.findAll({
    order: [
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
    // attributes:['order_id','shopify_order_id', 'names','client_phone_number','delivery_address','watch_brand_and_model','order_date'],
    where: {
    order_treatement: 'treated',
    order_status:'reservation'
    // order_status: {
    //   [Op.or]: ['confirmed', 'delivered', 'in-delivery']
    // }
  }
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

// GET CONFIRMED ORDERS
router.get('/get-delivered-orders', (req, res, next)=>{
   
  Client_order.findAll({
    order: [ 
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','shopify_order_id','names','client_phone_number','delivery_address','watch_brand_and_model','order_date','comment','order_status',
  'delivery_date','delivery_status','payment_status','print_status'],
  where: {
    order_treatement: 'treated',
    order_status: {
      [Op.or]: ['confirmed']
    },
    delivery_status: {
      [Op.or]: ['delivered']
    }
   
  }
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
 

// GET CONFIRMED ORDERS
router.get('/get-confirmed-orders', (req, res, next)=>{
   
  Client_order.findAll({
    order: [ 
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','shopify_order_id','names','client_phone_number','delivery_address','watch_brand_and_model','order_date','comment','order_status',
  'delivery_date','delivery_status','payment_status','print_status'],
  where: {
    order_treatement: 'treated',
    order_status: {
      [Op.or]: ['confirmed']
    },
    delivery_status: {
        [Op.or]: ['in-preparation']
      }
  }

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

// GET IN DELIVERY ORDERS
router.get('/get-indelivery-orders', (req, res, next)=>{
   
  Client_order.findAll({
    order: [ 
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id', 'shopify_order_id','names','client_phone_number','delivery_address','watch_brand_and_model','order_date','comment','order_status',
  'delivery_date','delivery_status','payment_status','print_status'],
  where: {
    order_treatement: 'treated',
    order_status: {
      [Op.or]: ['confirmed']
    },
    delivery_status: {
        [Op.or]: ['in-delivery']
      }
  }

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

// GET ONE POST NOT TOUCHED

router.get('/get-one/:order_id', (req, res) => {
  const id = req.params.order_id;

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