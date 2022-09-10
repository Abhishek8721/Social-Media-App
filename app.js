const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {MONGOURI} = require('./keys')
require('./Model/user')
require('./Model/post')
app.use(express.json())
app.use(require('./Routes/auth'))
app.use(require('./Routes/post'))
const PORT = 5000

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected sucessfully")
})
mongoose.connection.on('error',(err)=>{
    console.log("error")
})

app.listen(PORT,()=>{
    console.log("listioning")
})