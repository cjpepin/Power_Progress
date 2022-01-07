const mongoose = require('mongoose')

const Lift = new mongoose.Schema({
    email: {type: String, required: true},
    lift: {type: String, required: true},
}, 
{collection: 'lifts'}
)

const model = mongoose.model('Lift', Lift)

module.exports = model