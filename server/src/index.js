const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const User = require('./models/user')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.json())// Plain object to Json
app.use(cors())

const port = 4000
connection()

app.post('/register', async(req, res) => {
  
  try{
    
    const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(userExists){
    res.status(409).json({msg: 'Phone number already taken'})
    //??why conflict, user name can be duplicate but not phone number?

  }else{
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
    req.body.password = hashPassword
    const data = await User.create(req.body)
    
  if(data) res.json({msg: 'user registered'})
  

  }

  }  catch(err){
    console.log(err)

  }

})

app.post('/', async(req, res)=>{
  const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(!userDetails){
    res.json({msg :'Invalid Credentials'})
  }else{
    const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
    console.log(isMatched)
    if(isMatched){
      res.json({msg :'Login Success'})
    }else{
      res.json({msg :'Incorrect password'})
    }
  }

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})