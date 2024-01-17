const express = require('express')
const router = express.Router()
const CustomerProfile = require('../models/customerProfile')

router.get('/', async (req, res) => {
    try {
        const customerProfile = await CustomerProfile.find()
        res.json(customerProfile)
    } catch (error) {
        console.log('Failed to get CustomerProfile!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getCustomerProfile, async (req, res) => {
    res.json(res.customerProfile)
})

router.post('/', (req, res) => {
    try {
        const customerProfile = new CustomerProfile({
            // profilePic: req.body.profilePic,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNum: req.body.phoneNum,
            address: req.body.address,
            email: req.body.email,
            userId: req.body.userId,
            business: req.body.business
        })
        customerProfile.save()
        res.status(200).json('CustomerProfile Saved!')
    } catch (error) {
        console.log('Failed to create CustomerProfile', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', getCustomerProfile, async(req, res) => {
    // if (req.body.profilePic != null){
    //     res.customerProfile.profilePic = req.body.profilePic
    // }
    if (req.body.firstName != null){
        res.customerProfile.firstName = req.body.firstName
    }
    if (req.body.lastName != null){
        res.customerProfile.lastName = req.body.lastName
    }
    if (req.body.address != null){
        res.customerProfile.address = req.body.address
    }
    if (req.body.phoneNum != null){
        res.customerProfile.phoneNum = req.body.phoneNum
    }
    if (req.body.email != null){
        res.customerProfile.email = req.body.email
    }
    if (req.body.userId != null){
        res.customerProfile.userId = req.body.userId
    }
    try {
        const updatedCustomerProfile = await res.customerProfile.save()
        res.json(updatedCustomerProfile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', getCustomerProfile, async (req, res) => {
    try {
        await res.customerProfile.deleteOne()
        res.json({ message: 'Deleted customerProfile!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getCustomerProfile(req, res, next) {
    let customerProfile
    try {
        customerProfile = await CustomerProfile.findOne({userId: req.params.id})
        if (customerProfile == null) {
            return res.status(404).json('Cannot find customerProfile')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.customerProfile = customerProfile
    next()
}


module.exports = router