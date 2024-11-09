const Employee = require('../models/Employee')
const Users = require('../models/Users')

const getAllEmployees = async(req,res)=>{

    const employees = await Users.find()
    if(!employees) return res.status(204).json({'message':'No employees found'})
    res.json(employees)
}

const createNewEmployee = async(req,res)=>{
   if(!req?.body?.firstname || req?.body?.lastname){
    return res.status(400).json({'message':'First and last names are required'})
   }

   try {

    const result = Users.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    res.status(201).json(result)
   }
   catch(err){
    res.status(500).json(err)
   }
}

const updateEmployee = async(req,res)=>{
    
    if(!req?.body?.id){
        return res.status(400).json({'message':"ID parameter is required"})
    }

    const employee = await Users.findOne({_id:req.body.findOne}).exec()

    if(!employee){
        res.status(204).json({'message':`No employee matches ID ${req.body.id}`})
    }
    if(req.body?.firstname) employee.firstname = req.body.firstname
    if(req.body?.lastname) employee.lastname = req.body.lastname
    const result = await employee.save()
    res.json(result)
 }
const deleteEmployee = async(req,res)=>{
    
    if(!req?.body?.id){
        return res.status(400).json({'message':"Employee ID is required"})
    }

    const employee = await Users.findOne({_id:req.body.findOne}).exec()

    if(!employee){
        res.status(204).json({'message':`No employee matches ID ${req.body.id}`})
    }
   
    const result = await employee.deleteOne({_id:req.body.id})
    res.json(result)
 }

 const getEmployee = async(req,res)=>{
    if(!req?.params?.id){
     return res.status(400).json({'message':'Employee ID required'})
    }
    const employee = await Users.findOne({_id:req.params.findOne}).exec()
    
    if(!employee){
        res.status(204).json({'message':`No employee matches ID ${req.params.id}`})
    }
   res.json(employee)
 }

module.exports = {getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee}
