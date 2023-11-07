const mongoose = require('mongoose')
const connection = async()=>{
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ktmeatsdb');
        if(conn){
            console.log("connected to db")
        }
            
        
        } catch(err){
            console.log(err)
        }

}

module.exports = connection