const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    collaborator: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema)