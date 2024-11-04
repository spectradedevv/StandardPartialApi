const jwt = require('jsonwebtoken')
const User = require('../models/Users')


const handleLogout = async(req,res)=>{

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt
const foundUser = await User.findOne({refreshToken}).exec()
    if(foundUser){
        res.clearCookie('jwt',{httpOnly:true})
        res.sendStatus(204)
    }

    //Delete refreshToken in DB
foundUser.refreshToken = ''
const result = await foundUser.save()
res.clearCookie('jwt',{httpOnly:true}).sendStatus(204)

}

module.exports = handleLogout