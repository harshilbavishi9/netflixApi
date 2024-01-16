const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
}, { timestamps: true })

const Genre = mongoose.model('genre', genreSchema)

module.exports = Genre  