const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const routes = express()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const {JWT_SECRET} = require('../keys')
routes.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body
    if(!name|| !email|| !password){
        return res.status(422).json({error:"please enter all the field"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exits"})
        }
        bcrypt.hash(password,12).then(hashpassword=>{
            const user = new User({
                name,
                email,
                password:hashpassword,
                pic
            })
            user.save().then((user)=>{
                res.json({message:"saved successfullu"})
            }).catch(err=>{
                console.log(err)
            })
        })
       
    }).catch(err=>{
        console.log(err)
    })
})
routes.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter all the field"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(isMatch=>{
            if(isMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,pic} = savedUser
                res.json({token,user:{_id,name,email,pic}})
            }else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
    })
})
routes.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})
module.exports = routes