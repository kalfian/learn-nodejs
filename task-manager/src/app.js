const express = require('express')
require('./db/mongoose')

const TaskRouter = require('./router/task')
const UserRouter = require('./router/user')

const app = express()
const port = process.env.PORT || 3000

// Maintenance Middleware
// app.use((req, res, next) => {
//     res.status(503).send('Site currently down. Check back soon')
// })

app.use(express.json())

//Route List
app.use(UserRouter)
app.use(TaskRouter)

app.get('/', (req, res) => {
    res.send("Welcome to Task Manager API")
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})