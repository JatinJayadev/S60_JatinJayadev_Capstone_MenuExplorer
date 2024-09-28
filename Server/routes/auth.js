const express = require('express')
const User = require('../models/User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");

require('dotenv').config()

const app = express()
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "blogiepost@gmail.com",
        pass: "vuvmzygkwombzvur",
    },
});

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const secret = process.env.secret

function generateToken(userId, role) {
    const token = jwt.sign({ userId: userId, role: role }, secret, {
        expiresIn: '1h'
    });
    return token;
}

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        const hashedOtp = bcrypt.hashSync(otp, 10);

        const mailOptions = {
            from: "blogiepost@gmail.com",
            to: email,
            subject: "Your OTP for Password Reset",
            html: `<h1>Hey, welcome!</h1> <p>Here is your OTP for password reset:</p> <h2>${otp}</h2>`
        };

        await transporter.sendMail(mailOptions);
        console.log("OTP sent to email:", email);

        res.json({ hashedOtp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const updateUserPassword = async (email, newPassword) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();
        console.log('Password updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        throw new Error('Error updating password');
    }
};

app.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword, hashedOtp } = req.body;

    const isOtpValid = bcrypt.compareSync(otp, hashedOtp);

    if (isOtpValid) {
        await updateUserPassword(email, newPassword);
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
});

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
    const { name, email, password, photoLink } = req.body;

    User.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).send({ message: 'User already registered with this email.' });
            }

            const hashedPassword = hashPassword(password);

            User.create({
                name, email, password: hashedPassword, roles: 'user', photo: photoLink
            })
                .then((result) => {
                    res.status(201).send(result);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});


app.post('/googlesignup', (req, res) => {
    const { name, email } = req.body;
    const password = process.env.password
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
            return res.status(404).send({ message: 'Invalid User' })
        }

        const plainText = hashPassword(password)

        if (plainText == user.password) {
            const token = generateToken(user._id, user.roles);
            return res.status(200).send({ message: 'Logged In Successfully', token, profileLink: user.photo, role: user.roles })
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
                return res.status(404).json({ error: 'You are not registered!' });
            }
            const password = process.env.password
            const hashedPassword = hashPassword(password)

            if (hashedPassword == user.password) {
                const token = generateToken(user._id, user.roles);
                return res.status(201).send({ message: 'Logged In Successfully', token })
            } else {
                return res.status(401).send({ error: 'Invalid Credentials' })
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
        .then(() => {
            res.status(200).send("User deleted successfully")
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = app;