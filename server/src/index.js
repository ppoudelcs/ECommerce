const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const app = express()

require('dotenv').config()
console.log(process.env.SECRET_KEY)

const userRoute=require('./routes/user')
const productRoute=require('./routes/product')

app.use(express.json())// Plain object to Json
app.use(cors())

app.use('/',userRoute)
app.use(productRoute)





const port = process.env.PORT
connection()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})