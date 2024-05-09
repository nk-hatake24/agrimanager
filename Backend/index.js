const express = require('express')
require('dotenv').config()
const {dbConnection} =require('./src/config/dbConfig')
const cors =require('cors')
const morgan = require('morgan')
// const cookieParser = require('cookies-parser')



// route files
const employeeRoute = require('./src/route/employeeRoutes')
const budgetRoute = require('./src/route/budgetRoute')
const stockRoute =require('./src/route/stockRoute')
const supplierRoute =require('./src/route/supplierRoute')
const transactionRoute = require('./src/route/transactionRoute')


const app = express()
const port = 3500 || Env.process.PORT

// ******** middlewares *****************
app
.use(express.json())
.use(cors({
    origin: ['*'],
    credentials: true,
}))
// .options('*', cors())
// .use(cookieParser())
.use(morgan("dev"))

// ************ db connection****************
dbConnection()


// *****************routes******************

app.use("/api/transaction", transactionRoute)
app.use("/api/supplier", supplierRoute)
app.use("/api/stock", stockRoute)
app.use("/api/budget", budgetRoute)
app.use("/api/employee", employeeRoute);
app.use("*", (req,res)=>{
    res.status(404).json({message:'route not found!'})
})







app.listen(port, ()=> console.log(`the server is active and listening on port ${port}`))

module.exports= {app}

