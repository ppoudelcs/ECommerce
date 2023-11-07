//modular
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

//commonjs
const mongoose = require('mongoose')

//creating a schema
const userSchema = new mongoose.Schema({
  fullName: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  confirmPassword: String,
  phoneNumber: Number

  
});

//creating a model
const User = mongoose.model('User', userSchema);
module.exports = User