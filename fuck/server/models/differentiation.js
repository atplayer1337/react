const mongoose = require('mongoose')
const Schema = mongoose.Schema

const diffs = new Schema(
    {
        fx: { type: String, required: true },
        degree: { type: String, required: true },
        x: { type: String, required: true },
        h: { type: String, required: true },
    },
)
module.exports = mongoose.model('diffs', diffs)