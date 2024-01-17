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
    included: {
        type: Array,
        required: true
    },
    userId: {
        type: String,
        requried: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Architectural Designers',
            'Bathroom Fitters',
            'Bricklayers',
            'Builders',
            'Carpenters & Joiners',
            'Carpet & Lino Fitters',
            'Chimney & Fireplace Specialists',
            'Conservatory Installers',
            'Conversion Specialists',
            'Damp Proofing Specialists',
            'Decking Specialists',
            'Demolition Specialists',
            'Driveway Pavers',
            'Electricians',
            'Extension Builders',
            'Fascias & Soffits Specialists',
            'Fencers',
            'Flooring Fitters',
            'Gardeners',
            'Gas Engineers',
            'Groundworkers',
            'Guttering Installers',
            'Handymen',
            'Heating Engineers',
            'Insulation Installers',
            'Kitchen Fitters',
            'Landscape Gardeners',
            'Locksmiths',
            'Loft Conversion Specialists',
            'New Home Builders',
            'Painters & Decorators',
            'Plasterers',
            'Plumbers',
            'Repointing Specialists',
            'Restoration & Refurb Specialists',
            'Roofers',
            'Security System Installers',
            'Stonemasons',
            'Tarmac Driveway Specialists',
            'Tilers',
            'Tradesmen',
            'Tree Surgeons',
            'Waste Clearance Specialists',
            'Window & Door Fitters',
        ]
    }
})

module.exports = mongoose.model('Services', servicesSchema)