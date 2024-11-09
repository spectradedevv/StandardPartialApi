require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT||3500
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const cors = require('cors');


//Connect to database

connectDB()
app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())


app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/authRoute'))

app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logoutRoute'))

app.use(verifyJWT)

app.use('/users',require('./routes/usersRoute')) 
app.use('/employees',require('./routes/employeesRoute'))

mongoose.connection.once('open',()=>{
console.log("Connected to MongoDB")
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})
})
