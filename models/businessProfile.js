const mongoose = require('mongoose')

const businessProfileSchema = new mongoose.Schema({
    businessPic: {
        type: String,
        required: true,
        default: ''
    },
    businessName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    owner: {
        type: String,
        required: true,
    },
    address: {
        type: String, 
        requried: true,
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BusinessProfile', businessProfileSchema)