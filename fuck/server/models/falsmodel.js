const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fals = new Schema(
    {
        fx: { type: String, required: true },
        xl: { type: String, required: true },
        xr: { type: String, required: true },
    },
)
module.exports = mongoose.model('fals', fals)
