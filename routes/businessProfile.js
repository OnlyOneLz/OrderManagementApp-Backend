const express = require('express')
const router = express.Router()
const BusinessProfile = require('../models/businessProfile')

router.get('/', async (req, res) => {
    try {
        const businessProfile = await BusinessProfile.find()
        res.json(businessProfile)
    } catch (error) {
        console.log('Failed to get businessProfile!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getBusinessProfile, async (req, res) => {
    res.json(res.businessProfile)
})

router.post('/', (req, res) => {
    try {
        const businessProfile = new BusinessProfile({
            businessPic: req.body.businessPic,
            businessName: req.body.businessName,
            owner: req.body.owner,
            address: req.body.address,
            email: req.body.email
        })
        businessProfile.save()
        res.status(200).json('businessProfile Saved!')
    } catch (error) {
        console.log('Failed to create businessProfile', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', getBusinessProfile, async(req, res) => {
    if (req.body.businessPic != null){
        res.businessProfile.businessPic = req.body.businessPic
    }
    if (req.body.businessName != null){
        res.businessProfile.businessName = req.body.businessName
    }
    if (req.body.owner != null){
        res.businessProfile.owner = req.body.owner
    }
    if (req.body.address != null){
        res.businessProfile.address = req.body.address
    }
    if (req.body.email != null){
        res.businessProfile.email = req.body.email
    }
    try {
        const updatedbusinessProfile = await res.businessProfile.save()
        res.json(updatedbusinessProfile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', getBusinessProfile, async (req, res) => {
    try {
        await res.businessProfile.deleteOne()
        res.json({ message: 'Deleted businessProfile!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getBusinessProfile(req, res, next) {
    let businessProfile
    try {
        businessProfile = await BusinessProfile.findById(req.params.id)
        if (businessProfile == null) {
            return res.status(404).json({ message: 'Cannot find businessProfile' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.businessProfile = businessProfile
    next()
}


module.exports = router