
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    quote: {type: String},
    
}, 
{collection: 'users'}
)

const model = mongoose.model('User', User)

module.exports = model