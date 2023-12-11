require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const orderRouter = require('./routes/orders.js')
app.use('/orders', orderRouter)

const bRouter = require('./routes/businessProfile.js')
app.use('/bProfile', bRouter)

const cRouter = require('./routes/customerProfile.js')
app.use('/cProfile', cRouter)

const servicesRouter = require('./routes/services.js')
app.use('/services', servicesRouter)

app.listen(3000, () => console.log('server has started'))

