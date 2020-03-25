const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secants = new Schema(
    {
        fx: { type: String, required: true },
        xold: { type: String, required: true },
        xnew: { type: String, required: true },
    },
)
module.exports = mongoose.model('secants', secants)