const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerNewUser = async (req, res) => {

 
    try {   
     
         const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
         if (userExists) {
           res.status(409).json({ msg: 'Phone number already taken' })
           //??why conflict, user name can be duplicate but not phone number?
     
         } else {
           const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
           req.body.password = hashPassword
           req.body.avatar = req.file.path
           const data = await User.create(req.body)
     
           if (data) res.json({ msg: 'user registered' })
     
     
         }
     
       } catch (err) {
         console.log(err)
     
       }
     
     }

     const loginUser = async (req, res) => {
        try {
      
          const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber}).lean() //To exclude automatically created hidden data and features behind the scene
          if (!userDetails) {
            res.status(401).json({ msg: 'Invalid Credentials' })
          } else {
            const isMatched = await bcrypt.compare(req.body.password, userDetails.password)
            if (isMatched) {
              const token = jwt.sign({ phoneNumber: 9841000000 }, process.env.SECRET_KEY);
              const {password, ...userInfo} = userDetails
              
              res.json({ msg: 'Login Success', token, userDetails:userInfo })
            } else {
              res.status(401).json({ msg: 'Incorrect password' })
            }
          }
      
      
        } catch (err) {
          console.log(err)
        }
      
      }

module.exports = {registerNewUser, loginUser}