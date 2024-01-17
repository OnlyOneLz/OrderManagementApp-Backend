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
            userId: req.body.userId,
            category: req.body.category,
            included: req.body.included
        })
        services.save()
        res.status(200).json('services Saved!')
    } catch (error) {
        console.log('Failed to create services', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async(req, res) => {
    const services = await Services.findById(req.params.id)
    if (req.body.title != null){
        services.title = req.body.title
    }
    if (req.body.cost != null){
        services.cost = req.body.cost
    }
    if (req.body.description != null){
        services.description = req.body.description
    }
    if (req.body.category != null){
        services.category = req.body.category
    }
    if (req.body.included != null){
        services.included = req.body.included
    }
    try {
        services.save()
        const updatedServices = await services.save()
        res.json(updatedServices)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        const services = await Services.findById(req.params.id)
        if (services == null) {
            return res.status(404).json('Cannot find Services')
        }else{
        await services.deleteOne()
        res.json({ message: 'Deleted services!'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getServices(req, res, next) {
    let services
    try {
        services = await Services.find({userId: req.params.id})
        if (services == null) {
            return res.status(404).json('Cannot find Services')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.services = services
    next()
}


module.exports = router