const express=require('express')
const router=express.Router()
const Product = require('../models/product')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000)
    cb(null, uniqueSuffix+'-'+ file.originalname )
  }
})
const upload = multer({ storage: storage })





router.post('/products', upload.single('productImage'),async (req, res) => {
  
  
  req.body.productImage = req.file.filename
  const data = await Product.create(req.body)
  if (data) {
    res.json({ msg: `${req.body.productName} registered succesfully` })
  } 
  


  })


  router.get('/products', async (req, res) => {
    
    const limitCount = 4
    const skipCount =(req.query.page-1)*limitCount
    const data = await Product.find().limit(limitCount).skip(skipCount)
    console.log(data)
    if (data) {
      res.json({productList: data})
    }
  })

  router.get('/products/:id', async (req, res) => {
    const data = await Product.findById(req.params.id)
    console.log(data)
    if (data) {
      res.json({productList: data})
    }
  })

  router.get('/search-products', async (req, res) => {
    const data = await Product.find({productName: {$regex: req.query.name}})
    res.json({productList: data})
  })
  

  
  module.exports=router;