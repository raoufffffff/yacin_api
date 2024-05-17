const mongoose = require('mongoose')

const item = new mongoose.Schema({
    price: Number,
    name: String,
    des: String,
    type: String,
    img: String
})


const Item = mongoose.model('item', item)

module.exports = Item