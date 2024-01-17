const mongoose = require('mongoose')

const enquiriesSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    serviceId: {
        type: String,
        required: true
    },
    businessId:{
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Enquiries', enquiriesSchema)