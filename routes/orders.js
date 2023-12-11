const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')

router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find()
        res.json(orders)
    } catch (error) {
        console.log('Failed to get orders!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getOrders, async (req, res) => {
    res.json(res.order)
})

router.post('/', (req, res) => {
    try {
        const orders = new Orders({
            customerId: req.body.customerId,
            serviceId: req.body.serviceId,
        })
        orders.save()
        res.status(200).json('Order Saved!')
    } catch (error) {
        console.log('Failed to create orders', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', getOrders, async(req, res) => {
    if (req.body.expensis != null){
        res.order.expensis = req.body.expensis
    }
    if (req.body.paid != null){
        res.order.paid = req.body.paid
    }
    if (req.body.status != null){
        res.order.status = req.body.status
    }
    try {
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', getOrders, async (req, res) => {
    try {
        await res.order.deleteOne()
        res.json({ message: 'Deleted Order!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getOrders(req, res, next) {
    let order
    try {
        order = await Orders.findById(req.params.id)
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find Order' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.order = order
    next()
}


module.exports = router