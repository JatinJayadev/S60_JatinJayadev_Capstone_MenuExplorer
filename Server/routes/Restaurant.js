const express = require('express')
const Restaurant = require('../models/Restaurant')
const User = require('../models/User');
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

app.get('/restaurantsOwned', authenticateToken, (req, res) => {
    const userId = req.userId;
    console.log(userId)

    Restaurant.find({ owner: userId })
        .then((restaurants) => {
            res.status(200).send(restaurants);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving owned restaurants.", error: err.message });
        });
});

app.post('/addRestaurant', authenticateToken, (req, res) => {
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


app.put('/restaurants/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }

            // Update the restaurant properties directly
            Object.keys(updatedData).forEach(key => {
                restaurant[key] = updatedData[key];
            });

            // Here, you would typically call a method to save this update to the database
            Restaurant.findByIdAndUpdate(id, restaurant)
                .then(() => {
                    res.status(200).send(restaurant);
                })
                .catch((err) => {
                    res.status(500).send({ message: "Error updating restaurant.", error: err.message });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error finding restaurant.", error: err.message });
        });
});

app.put('/restaurants/:restaurantId/menu/:categoryId', (req, res) => {
    const { restaurantId, categoryId } = req.params;
    const updatedCategory = req.body;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }

            // Find the category to update by its _id
            const categoryIndex = restaurant.menu.findIndex(
                (category) => category._id.toString() === categoryId
            );

            if (categoryIndex === -1) {
                return res.status(404).json({ message: 'Category not found' });
            }

            restaurant.menu[categoryIndex] = updatedCategory;

            return restaurant.save();
        })
        .then((updatedRestaurant) => {
            res.json(updatedRestaurant);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error', error: err });
        });
});


app.delete('/restaurants/:id/menu/:categoryId', authenticateToken, (req, res) => {
    const { id, categoryId } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }

            const categoryIndex = restaurant.menu.findIndex(category => category._id.toString() === categoryId);
            if (categoryIndex === -1) {
                return res.status(404).send({ message: "Category not found." });
            }

            restaurant.menu.splice(categoryIndex, 1);

            Restaurant.findByIdAndUpdate(id, restaurant)
                .then(() => {
                    res.status(200).send(restaurant);
                })
                .catch((err) => {
                    res.status(500).send({ message: "Error deleting menu category.", error: err.message });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error finding restaurant.", error: err.message });
        });
});

app.delete('/restaurants/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    Restaurant.findByIdAndDelete(id)
        .then((deletedRestaurant) => {
            if (!deletedRestaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }
            res.status(200).send({ message: "Restaurant deleted successfully.", deletedRestaurant });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error deleting restaurant.", error: err.message });
        });
});

module.exports = app;