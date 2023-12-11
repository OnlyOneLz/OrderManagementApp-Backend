const mongoose = require('mongoose')

const customerProfileSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        required: true,
        default: 'url'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    address: {
        type: String, 
        requried: true,
    },
    phoneNum: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('CustomerProfile', customerProfileSchema)