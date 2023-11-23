const express=require('express')
const router=express.Router()

const Product = require('../models/product')


router.post('/products', async (req, res) => {
  
  const data = await Product.create(req.body)
  if (data) {
    res.json({ msg: `${req.body.productName} registered succesfully` })
  } 
  


  })


  router.get('/products', async (req, res) => {
    const data = await Product.find()
    console.log(data)
    if (data) {
      res.json({productList: data})
    }
  })
  

  
  module.exports=router;