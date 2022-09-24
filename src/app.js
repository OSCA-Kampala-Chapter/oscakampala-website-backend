const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./config/DatabaseConfig')
const auth = require('./api/v1/middlewares/auth')
var { unless } = require("express-unless");

// MIDDLEWARES
require("dotenv").config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CONNECT TO MONGO DB
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log("Database connected successfully")
},
(error)=>{
console.log("Database connection failed",error)
})
 
// CONFIGURE EXPRESS UNLESS ON ROUTES WHICH DON'T NEED AUTHENTICATION
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
path:[
    {url:'/api/v1/users/login',method:['POST']},
    {url:'/api/v1/users/register',method:['POST']}
]
}))

// REGISTER ROUTES TO EXPRESS 
app.use("/api/v1/users/",require('./api/v1/routes/UserRoutes'));

module.exports = app
