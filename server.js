require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const enquiriesRouter = require('./routes/enquiries.js')
app.use('/enquiries', enquiriesRouter)

const bRouter = require('./routes/businessProfile.js')
app.use('/bProfile', bRouter)

const cRouter = require('./routes/customerProfile.js')
app.use('/cProfile', cRouter)

const servicesRouter = require('./routes/services.js')
app.use('/services', servicesRouter)

const messagesRouter = require('./routes/messages.js')
app.use('/messages', messagesRouter)

app.listen(4000, () => console.log('server has started'))

