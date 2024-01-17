const express = require('express')
const router = express.Router()
const Enquiries = require('../models/enquiries')

router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiries.find()
        res.json(enquiries)
    } catch (error) {
        console.log('Failed to get orders!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getEnquiries, async (req, res) => {
    res.json(res.enquiries)
})

router.post('/', (req, res) => {
    try {
        const enquiries = new Enquiries({
            customerId: req.body.customerId,
            serviceId: req.body.serviceId,
            message: req.body.message,
            businessId: req.body.businessId,
            customerName: req.body.customerName,
            active: true
        })
        enquiries.save()
        res.status(200).json('enquiries Saved!')
    } catch (error) {
        console.log('Failed to create enquiries', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', getEnquiries, async (req, res) => {
    try {
        const updatedEnquiries = await res.enquiries.save()
        res.json(updatedEnquiries)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

router.delete('/:id', getEnquiries, async (req, res) => {
    try {
        await res.enquiries.deleteOne()
        res.json({ message: 'Deleted Order!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getEnquiries(req, res, next) {
    let enquiries
    try {
        enquiries = await Enquiries.find({
            $or: [
                { businessId: req.params.id },
                { customerId: req.params.id }
            ]
        });
        console.log(enquiries);
        if (enquiries == null) {
            return res.status(404).json('Cannot find enquiries')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.enquiries = enquiries
    next()
}

module.exports = router