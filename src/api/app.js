const express = require('express')
const bodyParser = require('body-parser')
const config = require("../../config/config.json")
const port = config.port
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// -----------------------------------
// Routes
// -----------------------------------

// -----------------------------------


// -----------------------------------
// LISTEN
// -----------------------------------
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
// -----------------------------------