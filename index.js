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
        console.error(error.message)
    }
})

//get all todos
app.get('/todos', async(req, res) => {
    try {
       const allTodos = await pool.query('SELECT * FROM todo')
       res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a single todo
app.get('/todos/:id', async(req,res) => {
    try {
        const {id} = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])

        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update todo
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])

        res.json('todo was updated')
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})