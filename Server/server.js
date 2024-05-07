const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config()

const port = process.env.PORT || 4050;

app.get('/', (req, res) => {
    res.send("Working!!!!")
});

app.listen(port, () => {
    console.log(`This is from port ${port}`)
})