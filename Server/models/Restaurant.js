const mongoose = require('mongoose');

// const menuItemSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true }
// });

// const menuSchema = new mongoose.Schema({
//     category: { type: String, required: true },
//     items: [menuItemSchema]
// });

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

const menuSchema = new mongoose.Schema({
    category: { type: String, required: true },
    items: [menuItemSchema],
});

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mobileNumber: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    location: { type: String, required: true }, // Google Maps link
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    // daysOfOperation: { type: String, required: true }, // e.g., "Mo,Tu,We,Th,Fr,Sa,Su"
    cuisineType: { type: String, required: true },
    image: { type: String, required: true },
    menu: [menuSchema],
    verified: { type: Boolean, default: false },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

// const menuItemSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String }
// });

// const restaurantSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     address: { type: String, required: true },
//     openingTime: { type: String, required: true },
//     closingTime: { type: String, required: true },
//     area: { type: String, required: true },
//     menu: [menuItemSchema],
//     verified: { type: Boolean, default: false }
// });

module.exports = mongoose.model('Restaurant', restaurantSchema);