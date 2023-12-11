const mongoose = require('mongoose')

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bpId: {
        type: String,
        requried: true,
    }
})

module.exports = mongoose.model('Services', servicesSchema)