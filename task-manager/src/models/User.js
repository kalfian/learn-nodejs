const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error('Email invalid')
            }
        }
    },  
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(val) {
            if(val.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "Password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if (val < 0) {
                throw new Error("age must be a positive number")
            }
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    console.log(this)

    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User