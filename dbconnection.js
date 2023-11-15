const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDb = () =>{
   mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Database connected")
   }).catch((err)=>{
    console.log(err)
   })
}

module.exports = connectDb