const express = require('express')
const router = express.Router()
const Messages = require('../models/messages')

router.get('/', async (req, res) => {
    try {
        const messages = await Messages.find()
        res.json(messages)
    } catch (error) {
        console.log('Failed to get messages!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getMessages, async (req, res) => {
    res.json(res.messages)
})

router.post('/', (req, res) => {
    try {
        const messages = new Messages({
            bProfile: req.body.bProfile,
            cProfile: req.body.cProfile,
            chat: req.body.chat
        })
        messages.save()
        res.status(200).json('messages Saved!')
    } catch (error) {
        console.log('Failed to create messages', error);
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async(req, res) => {
    const first = req.params.id.substring(0, 32)
    const second = req.params.id.substring(33, 65)
    const messages = await Messages.find({cProfile: first, bProfile: second})
    if (req.body.chat != null){
        messages[0].chat = req.body.chat
    }
    try {
        const updatedMessages = await messages[0].save()
        res.json(updatedMessages)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        const messages = await Messages.findById(req.params.id)
        if (messages == null) {
            return res.status(404).json('Cannot find Services')
        }else{
        await messages.deleteOne()
        res.json({ message: 'Deleted services!'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getMessages(req, res, next) {
    let messages
    const first = req.params.id.substring(0, 32)
    const second = req.params.id.substring(33, 65)
    try {
        messages = await Messages.find({cProfile: first, bProfile: second})
        if (messages == null) {
            return res.status(404).json('Cannot find Services')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.messages = messages
    next()
}

module.exports = router
