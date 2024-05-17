const mongoose = require('mongoose')

const update = new mongoose.Schema({
    invName: String,
    invtedName: String,
    invPhone: String,
    invtedPhone: String,
})


const Update = mongoose.model('update', update)

module.exports = Update