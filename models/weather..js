const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  temp: { type: String },
  desc: { type: String },
  icon: { type: String },
  dt: { type: Number },
})

module.exports = mongoose.model('Weather', schema)
