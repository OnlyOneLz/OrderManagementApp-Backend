const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true
    },
    serviceId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    expensis: {
        type: Number, 
        requried: false,
        default: 0
    },
    status: {
        type: String,
        requried: true,
        default: 'inProgress'
    }
})

module.exports = mongoose.model('Orders', ordersSchema)