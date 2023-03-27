const { model, Schema } = require('mongoose')

let UserSchema = new Schema({
    User: String,
    TotalCmd: Number,
    TotalMsg: Number
}, { versionKey: false })

module.exports = model("userinfo", UserSchema)