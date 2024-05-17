const mongoose = require('mongoose')

const users = new mongoose.Schema({
    name: String,
    phone: String,
    points: Number
})


const Users = mongoose.model('users', users)

module.exports = Users