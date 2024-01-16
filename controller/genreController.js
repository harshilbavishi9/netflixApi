
const Genre = require("../model/genre");
const Movie = require("../model/movieModel");
const mongoose = require('mongoose');
module.exports.create = async (req, res) => {
  try {
    const { title } = req.body
    const data = await Genre.create({
      title: title,
    })
    return res.status(201).json(data)

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.getMoviesByGenreId = async (req, res) => {
  try {
    const genreId = req.params.id;
    console.log(genreId);
    const data = await Movie.find({ genre: genreId }).populate('genre').exec();
    console.log('Found movies:', data);
    res.json({ success: true, data, length: data.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}


