const express = require('express')
const User = require('../models/User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(userId) {
    const token = jwt.sign({ userId: userId }, 'your_secret_key', {
        expiresIn: '1h'
    });
    return token;
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

app.post('/googlesignup', (req, res) => {
    const { name, email } = req.body;
    const password = "google-auth"
    const hashedPassword = hashPassword(password)
    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            } else {
                return User.create({ name, email, password: hashedPassword, roles: 'user' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
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

app.post('/googlelogin', (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const password = "google-auth"
            const hashedPassword = hashPassword(password)

            if (hashedPassword == user.password) {
                return res.status(201).send({ message: 'Logged In Successfully' })
            } else {
                return res.status(401).send({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

app.put('/changepassword/:id', (req, res) => {
    const id = req.params.id
    const { password, newPassword } = req.body;
    User.findByIdAndUpdate(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const hashedPassword = hashPassword(password)
            if (hashedPassword == user.password) {
                const newHashedPassword = hashPassword(newPassword)
                return User.findByIdAndUpdate(id, { password: newHashedPassword })
            } else {
                return res.status(401).json({ message: 'Password is incorrect' });
            }
        })
        .then((updatedUser) => {
            if (updatedUser) {
                res.status(200).json({ message: 'Password changed successfully' });
            }
        })
        .catch((err) =>
            res.status(500).json({ error: err.message })
        );
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((deletedUser) => {
            res.status(200).send("User deleted successfully")
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = app;