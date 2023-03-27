const { model, Schema } = require('mongoose')

let serverSetupSchema = new Schema({
    Guild: String,
    nsfwToggle: Boolean
}, {versionKey: false})

module.exports = model('setup', serverSetupSchema)