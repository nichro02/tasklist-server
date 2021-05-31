const express = require('express')
const app = express()
const cors = require('cors')

//middleware
//allow cors
app.use(cors())
//allow us to use req.body to get json data
app.use(express.json())

app.listen(5000, () => {
    console.log('listening on port 5000')
})