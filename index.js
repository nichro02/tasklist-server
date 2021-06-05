const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
//allow cors
app.use(cors())
//allow us to use req.body to get json data
app.use(express.json())

//ROUTES
//create todo

//get all todos

app.listen(5000, () => {
    console.log('listening on port 5000')
})