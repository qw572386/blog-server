const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date
    }
})
module.exports = mongoose.model('User', userSchema)