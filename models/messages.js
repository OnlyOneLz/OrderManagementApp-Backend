const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    bProfile: {
        type: String,
        required: true,
    },
    cProfile: {
        type: String,
        required: true,
    },
    chat: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model( 'Messages' , messagesSchema )