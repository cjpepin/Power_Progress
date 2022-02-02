const mongoose = require('mongoose')

const Color = new mongoose.Schema({
    color: {type: String, required: true},
}, 
{collection: 'colors'}
)

const model = mongoose.model('Color', Color)

module.exports = model