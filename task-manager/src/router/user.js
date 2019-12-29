const express = require('express')
const router = new express.Router()

const User = require('./../models/User')
const authMiddleware = require('../middleware/auth')

router.get('/users/me', authMiddleware, async (req, res) => {
    res.send(req.user)    
})

router.post('/users/login', async (req, res) => {
    console.log(req.body.email, req.body.password)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.createToken()

        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        ress.status(500).send()
    }
})

router.post('/users/logout-all', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const token = await user.createToken()

    try {
        await user.save()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get('/users', authMiddleware, async (req, res) => {
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

router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid updates!'})
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send();
        }

        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router