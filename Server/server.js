const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config()

const port = process.env.PORT || 4050;

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("MongoDB Compass is connected!")
        app.get('/', (req, res) => {
            res.send("Working!!!!")
        });
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log(`This is from port ${port}`)
})