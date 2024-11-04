const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()




const newUser = async(req,res)=>{

    const {username,password} = req.body

    if(!username&&!password) return res.status(400).json({"message":"Username and password is required"})
    
    const duplicateUser = await Users.findOne({username}).exec()
   
    if(duplicateUser) return res.sendStatus(409)
try{

    const protectedPassword = await bcrypt.hash(password,10)
    const result = await Users.create({
        "username":username,
        "password":protectedPassword})
    res.status(201).json({"success":`New user ${username} created!`})
    }
    catch(err){
        res.status(500).json({"message":err.message})
        console.log(err.message)
    }
  
}


module.exports = newUser