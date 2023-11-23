//modular
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

//commonjs
const mongoose = require('mongoose')

//creating a schema
const productSchema = new mongoose.Schema({
  productName: String, // String is shorthand for {type: String}
  productType: String,
  productPrice: String,
  
  
});

//creating a model
const Product = mongoose.model('Product', productSchema);
module.exports = Product