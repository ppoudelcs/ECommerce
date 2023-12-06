const express=require('express')
const router=express.Router()
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage })

const { registerNewUser, loginUser } = require('../controllers/user');


router.post('/register',  upload.single('avatar'), registerNewUser)
  
  router.post('/login', loginUser)
  
  module.exports=router;