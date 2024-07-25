const express = require('express')
const User = require('../models/User')
const crypto = require('crypto')

const app = express()
app.use(express.json())

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            res.status(201).json({ users })
            console.log("These are the users")
        }).catch((err) => {
            res.status(500).send(err)
        })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password)

    User.create({
        name, email, password: hashedPassword, roles: 'user'
    }).then((result) => {
        res.status(201).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(401).send({ message: 'Invalid Credentials' })
        }

        const plainText = hashPassword(password)

        if (plainText == user.password) {
            return res.status(201).send({ message: 'Logged In Successfully' })
        } else {
            return res.status(401).send({ message: 'Invalid Credentials' })
        }
    }).catch((err) => {
        res.status(500).send(err)
    })
})

module.exports = app;