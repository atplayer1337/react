const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newraphs = new Schema(
    {
        fx: { type: String, required: true },
        x0: { type: String, required: true },
    },
)
module.exports = mongoose.model('newraphs', newraphs)
