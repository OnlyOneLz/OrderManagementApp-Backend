const express = require('express')
const router = express.Router()
const Services = require('../models/services')

router.get('/', async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log('Failed to get services!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getServices, async (req, res) => {
    res.json(res.services)
})

router.post('/', (req, res) => {
    try {
        const services = new Services({
            title: req.body.title,
            cost: req.body.cost,
            description: req.body.description,
            bpId: req.body.bpId
        })
        services.save()
        res.status(200).json('services Saved!')
    } catch (error) {
        console.log('Failed to create services', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', getServices, async(req, res) => {
    if (req.body.title != null){
        res.services.title = req.body.title
    }
    if (req.body.cost != null){
        res.services.cost = req.body.cost
    }
    if (req.body.description != null){
        res.services.description = req.body.description
    }
    if (req.body.bpId != null){
        res.services.bpId = req.body.bpId
    }
    try {
        const updatedServices = await res.services.save()
        res.json(updatedServices)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', getServices, async (req, res) => {
    try {
        await res.services.deleteOne()
        res.json({ message: 'Deleted services!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getServices(req, res, next) {
    let services
    try {
        services = await Services.findById(req.params.id)
        if (services == null) {
            return res.status(404).json({ message: 'Cannot find Order' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.services = services
    next()
}


module.exports = router