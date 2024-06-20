const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
require('dotenv').config()
const{ dbConnection} = require('./src/config/dbConfig')


const userRoute = require('./src/route/userRoute')

const app = express()
const port = 3400 || process.env.PORT


// *******************{middleware}***********************************
app
// .use(cors())
// .options('*', cors())
.use(express.json())
// .use(morgan("dev"))

// *********************{dbConnection}*********************************

dbConnection()

// **********************{routes}*********************************
app.use('/api/user', userRoute)
app.use('*', (req,res)=>{
    res.status(404).json({message: 'route not found'})
})



app.listen(port, console.log(`the chatbot server is listenig on port ${port}`))