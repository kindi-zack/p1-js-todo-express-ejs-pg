const router = require('./routes/index')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.use(router)

app.listen(port, () => {
    console.log(`js Todo Running on port ${port}`)
})