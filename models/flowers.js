
const mongoose = require("mongoose")
const flowersSchema = mongoose.Schema({
flower_name: String,
flower_color: String,
flower_size: String
})
module.exports = mongoose.model("flowers",flowersSchema)