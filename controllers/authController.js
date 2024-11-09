const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const User = require('../models/Users')
const Users = require('../models/Users')
require('dotenv').config() 


const handleLogin = async(req,res)=>{
   
const {username,password } = req.body

if(!username && !password) return res.status(400).json({"message":"Username and password is required"})

const foundUser = await Users.findOne({username}).exec()
if(!foundUser) return res.sendStatus(401)

const match = bcrypt.compare(password,foundUser.password)

if(match){
  const roles = Object.values(foundUser.roles)
  const accessToken =  jwt.sign(
    { 
      "UserInfo":{
        "username":foundUser.username, 
        "roles":roles
      }
    }
    ,
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"30s"}
    )
  const refreshToken =  jwt.sign({"username":foundUser.username},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"1d"}
    )

    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({roles,accessToken
    })

}
else{
    res.sendStatus(401)
}




}

module.exports = handleLogin