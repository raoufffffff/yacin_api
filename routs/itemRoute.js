const experss = require('express')
const Item = require('../models/item')
const ItemRoute = experss.Router()

ItemRoute.get('/', async (req, res) => {
    try {
        const result = await Item.find()
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

ItemRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Item.findById(id)
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "not found" })
    }
})

ItemRoute.post('/', async (req, res) => {
    let { body } = req
    try {
        const result = await Item.create(body)
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

ItemRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const result = await Item.findByIdAndUpdate(id, body)
        res.status(202).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

ItemRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Item.findByIdAndDelete(id)
        res.status(204).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

module.exports = ItemRoute