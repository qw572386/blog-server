const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: String
    },
    categories: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastEditAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Article', articleSchema)