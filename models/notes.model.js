
const mongoose = require('mongoose')

const Note = new mongoose.Schema({
    email: {type: String, required: true},
    block: {type: String, required: true},
    note: {type: String, required: true},
    
}, 
{collection: 'notes'}
)

const model = mongoose.model('Note', Note)

module.exports = model