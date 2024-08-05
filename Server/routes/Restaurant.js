const express = require('express')
const Restaurant = require('../models/Restaurant')
const User = require('../models/User'); // Assuming you have a User model
const authenticateToken = require('../middleware/auth')
require('dotenv').config()

const app = express()
app.use(express.json())

app.get('/restaurants', (req, res) => {
    Restaurant.find()
        .then((restaurant) => {
            res.status(200).send(restaurant)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

app.get('/restaurants/:id', (req, res) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }
            res.status(200).send(restaurant);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving restaurant details.", error: err.message });
        });
});

app.post('/updateUserRole', authenticateToken, (req, res) => {
    const userId = req.userId;
    User.findByIdAndUpdate(userId, { role: owner })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send({ message: "User role updated successfully", user });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error updating user role", error: err });
        });
})

// const changeRole = (role, userId, res) => {
//     User.findByIdAndUpdate(userId, { role: role })
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).send({ message: "User not found" });
//             }
//             res.status(200).send({ message: "User role updated successfully", user });
//         })
//         .catch((err) => {
//             res.status(500).send({ message: "Error updating user role", error: err });
//         });
// }

app.post('/addrestaurant', authenticateToken, (req, res) => {
    const { restaurantName, mobileNumber, area, city, state, pincode, location, openingTime, closingTime, cuisineType, image, menu
    } = req.body;

    const owner = req.userId;

    User.findById(owner)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            Restaurant.create({
                restaurantName, owner, mobileNumber, area, city, state, pincode, location, openingTime, closingTime, cuisineType, image, menu, verified: false
            })
                .then((restaurant) => {
                    if (user.roles !== 'user') {
                        return res.status(201).send({ message: "Restaurant created successfully.", restaurant });
                    }

                    User.findByIdAndUpdate(owner, { roles: 'owner' }, { new: true })
                        .then((updatedUser) => {
                            res.status(201).send({ message: "Restaurant created successfully and user role updated.", restaurant, user: updatedUser });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: "Error updating user role", error: err });
                        });
                })
                .catch((err) => {
                    res.status(500).send({ message: "Error creating restaurant.", error: err });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error finding user.", error: err });
        });
});

module.exports = app;