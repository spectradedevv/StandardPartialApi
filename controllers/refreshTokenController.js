const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/Users')
const handleRefreshToken = async(req,res)=>{

    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    
    const foundUser = await User.findOne({refreshToken}).exec()

    if(!foundUser) return res.sendStatus(403)
    
   const accessToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
        const roles = Object.values(foundUser.roles)
        if(err||foundUser.username!== decoded.username) return res.sendStatus(403)
            console.log(`this is ${decoded.username}`)
        const accessToken = jwt.sign(
        {  
            "UserInfo":
        {
            "username":decoded.username,
            "roles":roles
        }
         
          },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30s'})
        res.json({accessToken})
        }
    )
    
    
  

}

  
module.exports = handleRefreshToken