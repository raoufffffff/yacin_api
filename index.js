const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const UserRoute = require('./routs/userRoute');
const ItemRoute = require('./routs/itemRoute');
const OrderRoute = require('./routs/orderRoute');
const Users = require('./models/user');
const Update = require('./models/Update');
const app = express()

app.use(cors());
app.use(express.json())

app.use('/', UserRoute)
app.use('/items', ItemRoute)
app.use('/order', OrderRoute)




app.get('/update', async (req, res) => {
    try {
        const result = await Update.find();
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

app.get('/update/find/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Update.findOne({ invtedPhone: id });
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

app.get('/update/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Update.findById(id);
        let newchange = await Users.findOne({ phone: result.invPhone })
        if (newchange) {
            newchange.points += 30
            let updated = await Users.findByIdAndUpdate(newchange._id, newchange)
            await Update.findByIdAndDelete(id)
            res.send(updated);
            return
        }
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

app.post('/find', async (req, res) => {
    const { body } = req
    try {
        const user = await Users.findOne({ phone: body.phone });
        if (!user) {
            return res.send({ message: "لايوجد حساب بهاد الرقم", is: false });
        }
        res.send({ data: user, is: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

app.listen("5000")



mongoose
    .connect('mongodb+srv://raoufhamoudi:raouf@cluster0.3xjn9ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))