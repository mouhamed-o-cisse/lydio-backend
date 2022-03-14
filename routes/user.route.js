const express = require('express')
const user = express.Router()
const  cors  =  require ( 'cors' )
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
user.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////GET ALL////////////////////////////////////////////////////

// user.get('/get-all', (req, res, next)=>{
   
//     User.findAll({
//       order: [
//         ['doctor_id', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in descending order
//   ] ,
//     } )
//     .then(users => {
//         if (users) {
//           res.json(users)
//         } 
//       } )
//       .catch(err => {
//         res.send('error: ' + err)
//       } )     
//  } ) ;


 ///////////////////////////////////////////////////REGISTER New User////////////////////////////////////////////////////

user.post('/new-account', (req, res) => {
    const  today  =  new  Date ()

    var id = 'USER-' + Math.floor(Math.random() * 10000);

    const  userData  =  {
      user_id: id,
      username: req.body.username,
      password: req.body.password,
      created: today
    }
    // console.log(userData.password)
    // console.log(userData)
    User.create(userData)
    .then(user => {
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
        
      } )
      res.json({ token: token })
      // console.log('okayyyy')
    } )
    .catch(err => {
      res.send('error: ' + err)
      // console.log('not okay')
    } )
  } )

///////////////////////////////////////////////////UPDATE THE TIME TABLE////////////////////////////////////////////////////
// doctor.put('/update', (req, res)=>{
//   // let user = req.body;
//   const now = new Date()
//   const  doctorData  =  {
//     username: req.body.username,
//     day: req.body.day,
//     last_update: now
//   }
//   const username = req.body.username;
//   Doctor.update(doctorData, 
//            { 
//              where: {
//                username: username
//               } 
//             }
//            ).then((doctor) => {
//              if(doctor){
//               res.status(200).json({msg:"updated succesfully"});
//              }
//              else {
//                res.send('username not found')
//              }
//            } )
//            .catch(err => {
//             res.send('error: ' + err)
//           } )       
// } )



///////////////////////////////////////////////////DOCTOR LOGIN////////////////////////////////////////////////////
 

user.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  } )
    .then(user => {
      // if (!user){
      //   console.log('show me')
      // }
      const users = {
        user_id: user.dataValues.user_id,
        username: user.dataValues.username,
        created: user.dataValues.created
      }
      // console.log(users)

      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        } )
        res.json({ 
          token: token, 
          expiresIn: 1440,
          user_id: user.dataValues.user_id,
          username: user.dataValues.username,
          created: user.dataValues.created  
        })
      }
      else {
        res.send('User does not exist');
      }
    } )
    .catch(err => {
      res.send('error: ' + err)
    } )
} )

// PROFILE

// user.get('/profile', (req, res) => {
//   var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//   User.findOne({
//     where: {
//       user_id: decoded.user_id
//     }
//   } )
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else { 
//         res.send('User does not exist')
//       }
//     } )
//     .catch(err => {
//       res.send('error: ' + err)
//     } )
// } )

module.exports = user;