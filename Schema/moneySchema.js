const { model, Schema } = require('mongoose')

let moneyschema = new Schema({
    User: String,
    Money: Number,
})

module.exports = model('money', moneyschema)