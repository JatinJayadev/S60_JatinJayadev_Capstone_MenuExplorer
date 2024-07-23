const express = require('express')
const User = require('../models/User')

const app = express()
app.use(express.json())

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.create({
        name, email, password, roles: 'user'
    }).then((result) => {
        res.status(201).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('login', (req, res) => {
    const { email, password } = req.body;

    User.findOne(email)
})

module.exports = app;