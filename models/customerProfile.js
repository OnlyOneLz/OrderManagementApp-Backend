const mongoose = require('mongoose')

const customerProfileSchema = new mongoose.Schema({
    // profilePic: {
    //     type: File,
    //     required: true,
    // },
    firstName: {
        type: String,
        required: false,
        default: ''
    },
    lastName:{
        type: String,
        requried: false,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    address: {
        type: String, 
        requried: true,
        default: ''
    },
    phoneNum: {
        type: Number,
        required: true,
        default: 0

    },
    email: {
        type: String,
        required: false,
        default: ''
    },
    userId: {
        type: String,
        required: true,
        default: ''
    },
})

module.exports = mongoose.model('CustomerProfile', customerProfileSchema)