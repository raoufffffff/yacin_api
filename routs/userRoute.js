const Update = require("../models/Update");
const Users = require("../models/user");
const experss = require('express')
const UserRoute = experss.Router()

UserRoute.get('/', async (req, res) => {
    try {
        const result = await Users.find()
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

UserRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Users.findById(id)
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "not found" })
    }
})

UserRoute.post('/', async (req, res) => {
    let { body } = req
    body.points = 30
    try {
        const isthere = await Users.findOne({ phone: body.phone })
        if (isthere) {
            res.status(201).send({ data: isthere, is: true, message: "عندك حساب بالفعل" })
            return
        }
        const result = await Users.create(body)
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})


UserRoute.post('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    body.points = 30
    try {
        const isthere = await Users.findOne({ phone: body.phone })
        if (isthere) {
            res.status(201).send({ data: isthere, is: true })
            return
        }
        const result = await Users.create(body)
        let theSender = await Users.findOne({ phone: id })
        if (theSender) {
            await Update.create({ invName: theSender.name, invPhone: theSender.phone, invtedName: body.name, invtedPhone: body.phone })
        }
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

UserRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const result = await Users.findByIdAndUpdate(id, body)
        res.status(202).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

module.exports = UserRoute