const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const User = require('./models/user')
const app = express()

app.use(express.json())// Plain object to Json
app.use(cors())

const port = 4000
connection()

app.post('/register', async(req, res) => {
  const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(userExists){
    res.status(409).json({msg: 'Phone number already taken'})

  }else{
    const data = await User.create(req.body)
  if(data) res.json({msg: 'user registered'})
  

  }
  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})