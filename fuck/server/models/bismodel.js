const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bis = new Schema(
    {
        fx: { type: String, required: true },
        xl: { type: String, required: true },
        xr: { type: String, required: true },
    },
)
module.exports = mongoose.model('bis', bis)
