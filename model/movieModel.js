const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: false,
    uniqe: true
  },
  description: {
    type: String,
    require: false,
  },
  image: [{
    type: String,
    require: false,
  }],
  titleImage: [{
    type: String,
    require: false,
  }],
  trailer: [{
    type: String, default: 'https://res.cloudinary.com/dp1ilgjra/video/upload/v1704795874/main/uploads/n63igja9glcs860fxbbq.mp4',
    require: false,
  }],
  logo: [{
    type: String,
    require: false,
  }],
  year: {
    type: String,
    default: false,
  },
  genre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genre',
    default: false,
  }],
  isSeries: {
    type: Boolean,
    default: false,
  },
  isPoppuler: {
    type: Boolean,
    default: false,
  },
  language: [{
    type: String,
  }],
  country: {
    type: String,
  },
  director: {
    type: String,
    require: false,
  },
  cast: {
    type: [String],
  },
  duration: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    require: false,
  },
  totalSeasons: {
    type: Number,
    default: 0,
  },
  seasons: [{
    seasonNumber: {
      type: Number,
    },
    episodes: {
      type: Number,
    },
  }],
}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie