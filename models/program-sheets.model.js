const mongoose = require('mongoose')

const ProgramSheet = new mongoose.Schema({
    email: {type: String, required: true},
    block: {type: String, required: true},
    sheetData: {type: String, required: true},
}, 
{collection: 'programsheets'}
)

const model = mongoose.model('ProgramSheet', ProgramSheet)

module.exports = model