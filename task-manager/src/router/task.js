const express = require('express')
const router = new express.Router()

const Task = require('./../models/Task')

// Task

// Create
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})

// POST
router.get('/tasks', async (req, res) => {
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
router.get('/tasks/:id', async (req, res) => {
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

//PATCH
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'isComplete']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid updates!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//delete
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

})

module.exports = router