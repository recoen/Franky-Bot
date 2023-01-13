const { model, Schema } = require('mongoose')

let economyschema = new Schema({
    User: String,
    Money: Number,
}, { versionKey: false } )

module.exports = model('money', economyschema)