const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

 
 try {   
  
      const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
      if (userExists) {
        res.status(409).json({ msg: 'Phone number already taken' })
        //??why conflict, user name can be duplicate but not phone number?
  
      } else {
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = hashPassword
        const data = await User.create(req.body)
  
        if (data) res.json({ msg: 'user registered' })
  
  
      }
  
    } catch (err) {
      console.log(err)
  
    }
  
  })
  
  router.post('/login', async (req, res) => {
    try {
  
      const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
      if (!userDetails) {
        res.status(401).json({ msg: 'Invalid Credentials' })
      } else {
        const isMatched = await bcrypt.compare(req.body.password, userDetails.password)
        if (isMatched) {
          const token = jwt.sign({ phoneNumber: 9841000000 }, process.env.SECRET_KEY);
          
          res.json({ msg: 'Login Success', token, userDetails })
        } else {
          res.status(401).json({ msg: 'Incorrect password' })
        }
      }
  
  
    } catch (err) {
      console.log(err)
    }
  
  })
  
  module.exports=router;