const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    console.log(this)

    next()

})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    const wrongCredential = new Error('Unable to login')

    if (!user) {
        throw wrongCredential
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw wrongCredential
    }

    return user

}

userSchema.methods.createToken = async function () {
    const user = this
    const token = jwt.sign({ 
        _id: user._id.toString()
    }, 'anuanuan')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.getPublicProfile = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User