const express = require('express')
const Razorpay = require("razorpay")

const app = express()
app.use(express.json())

var instance = new Razorpay({
    key_id: 'rzp_test_EzUsahd1tsDo2l',
    key_secret: 'pe9tcaS6mMkWQPrEDUK9lF0L',
});

app.post('/razorPay', async (req, res) => {
    const options = {
        amount: 100,
        currency: 'INR'
    };
    try {
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;