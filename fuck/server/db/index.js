const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:123@cluster0-nbsx4.mongodb.net/data', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db