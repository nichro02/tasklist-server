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
app.post('/todos', async(req, res)=>{
    try {
        const { description } = req.body
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description])

        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//get all todos

app.listen(5000, () => {
    console.log('listening on port 5000')
})