const express = require('express')
require('./db/mongoose')

const User = require('./models/User')
const Task = require('./models/Task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.get('/', (req, res) => {
    res.send("Welcome to Task Manager API")
})

// Users
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(404).send(e)
    }

    // User.find({}).then(users => {
    //     res.status(200).send(users)
    // }).catch(error => {
    //     res.status(404).send(error)
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    // User.findById(_id).then(user => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch(error => {
    //     res.status(500) .send(error)
    // })
    try {
        const user = await User.findById(_id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }

})

//Update
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

// Task

// Create
app.post('/tasks', async (req, res) => {
    // const task = new Task(req.body)

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try {
        const task = await new Task(req.body)
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})

// POST
app.get('/tasks', async (req, res) => {
    // Task.find({}).then(tasks => {
    //     res.status(200).send(tasks)
    // }).catch(error => {
    //     res.status(404).send(error)
    // })
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Detail
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    // Task.findById(_id).then((task) => {
    //     res.status(200).send(task)
    // }).catch((error) => {
    //     res.status(404).send(error)
    // })
    try {
        const task = await Task.findById(_id)
        res.status(200).send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})