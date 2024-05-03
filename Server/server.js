const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const port = 4050;

app.get('/', (req, res) => {
    res.send("Working!!!!")
});

app.listen(port, () => {
    console.log("This is from port 4050")
})