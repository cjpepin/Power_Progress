const mongoose = require('mongoose')

const Block = new mongoose.Schema({
    email: {type: String, required: true},
    blockName: {type: String, required: true},
    sheetURL: {type: String, required: true},
}, 
{collection: 'blocks'}
)

const model = mongoose.model('Block', Block)

module.exports = model