
const mongoose = require('mongoose')

const Data = new mongoose.Schema({
    email: {type: String, required: true},
    lift: {type: String, required: true},
    weight: {type: String, required: true},
    lbsorkg: {type: String, required: true},
    reps: {type: String, required: true},
    sets: {type: String, required: true},
    rpe: {type: String, required: true},
    date: {type: String, required: true},
    e1rm: {type: String, required: true},
    block: {type: String, required: true},
}, 
{collection: 'workouts'}
)

const model = mongoose.model('Workout', Data)

module.exports = model