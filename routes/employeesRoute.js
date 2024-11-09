const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')
const verifyRoles = require('../middleware/verifyroles')
const ROLES_LIST = require('../config/userRoles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

 module.exports = router