const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeesController')
const verifyRoles = require('../middleware/verifyroles')
const ROLES_LIST = require('../config/userRoles')

router.route('/')
.get(verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin),employeeController.getAllEmployees)



 module.exports = router