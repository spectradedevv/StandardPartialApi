
const express = require('express')
const router = express.Router()
const handleLoginController = require('../controllers/authController')


router.route('/').post(handleLoginController)
 

module.exports = router