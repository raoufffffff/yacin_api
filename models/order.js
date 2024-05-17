const mongoose = require('mongoose')

const order = new mongoose.Schema({
    userId: String,
    price: Number,
    orders: [],
    method: String,
    active: Boolean
})


const Order = mongoose.model('order', order)

module.exports = Order