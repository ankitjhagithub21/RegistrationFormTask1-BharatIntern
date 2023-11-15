const express = require('express')
const path = require('path')
const app = express()
const connectDb = require("./dbconnection")
const port = process.env.PORT || 3000
const User = require("./models/userModel.js")
//database connection
connectDb()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get("/",(req,res)=>{
    res.send("index.html")
})
app.post("/register",async(req,res)=>{
    const {username,email,password,cpassword} = req.body
    if(!username || !email || !password || !cpassword){
        return res.status(400).send({"message":"All fields are required"})
    }else {
        const isExist = await User.findOne({email})
        if(isExist){
            return res.status(400).send({"message":"Email already exist"})
        }
        try{
        
            if(password!==cpassword){
                res.status(400).send({"message":"Password does not match"})
            }else{
                const user = await new User({
                    name:username,
                    email,
                    password,
                    cpassword
                })
                await user.save()
                res.status(201).send({"message":"Registration successfull"}) 
                
            }
    
        }catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }
    
    
})

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})