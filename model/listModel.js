const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    uniqe: true
  },
  type: {
    type: String,
    require: true,
  },
  content: {
    type: Array,
    require: true,
  },
}, { timestamps: true })

const List = mongoose.model('List', listSchema)

module.exports = List