const express = require('express')
const routes = express.Router()
const movieController = require('../controller/movieController')
const genreController = require('../controller/genreController')
const { Productmultiplefile, upload } = require('../middleware/multer')


//movie
routes.post('/create', movieController.create)

routes.get('/getall', movieController.getAllMovie)

routes.get('/:id', movieController.getOneMovie)

routes.patch('/update/:id', Productmultiplefile, movieController.updateMovie)

// routes.post('/login', authController.login)


//genre
routes.post('/creategenre', genreController.create)

routes.get('/genremovie/:id', genreController.getMoviesByGenreId)

module.exports = routes