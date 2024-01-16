const Movie = require('../model/movieModel')
const { uploadFileToB2, uploadMultipleImages } = require('../middleware/cloudinary')
module.exports.create = async (req, res) => {
  try {
    const { title,
      description,
      year,
      limit,
      genre,
      isSeries,
      language,
      country,
      director,
      cast,
      seasons,
      totalSeasons,
      duration,
      releaseYear } = req.body;
    let titleImageUrl = []
    let trailerUrl = []
    let videoUrl = []
    let imageUrl = []

    // if (req.files.titleImage) {
    //   const imagePaths = req.files.titleImage.map((image) => image.path.replace(/\\/g, "/"));
    //   titleImageUrl = await uploadMultipleImages(
    //     imagePaths,
    //   );
    // }

    // if (req.files.trailer) {
    //   const imagePaths = req.files.trailer.map((image) => image.path.replace(/\\/g, "/"));
    //   trailerUrl = await uploadMultipleImages(
    //     imagePaths,
    //   );
    // }

    // if (req.files.video) {
    //   const imagePaths = req.files.video.map((image) => image.path.replace(/\\/g, "/"));
    //   videoUrl = await uploadMultipleImages(
    //     imagePaths,
    //   );
    // }

    // if (req.files.image) {
    //   const imagePaths = req.files.image.map((image) => image.path.replace(/\\/g, "/"));
    //   imageUrl = await uploadMultipleImages(
    //     imagePaths,
    //   );
    // }

    // if (req.files) {
    //   const trailerPath = req.files.trailer.map((item) => item.path)
    //   trailer = await uploadFileInS3("trailer", trailerPath)
    // }

    // if (req.files) {
    //   const videoPath = req.files.video.map((item) => item.path)
    //   video = await uploadFileInS3("video", videoPath)
    // }

    // if (req.files) {
    //   const imagePath = req.files.image.map((item) => item.path)
    //   image = await uploadFileInS3("image", imagePath)
    // }
    let data = {
      title: title,
      description: description,
      // image: imageUrl.map((item) => item.secure_url) || null,
      // titleImage: titleImageUrl.map((item) => item.secure_url) || null,
      trailer: trailerUrl.map((item) => item.secure_url) || null,
      video: videoUrl.map((item) => item.secure_url) || null,
      year: year,
      limit: limit,
      genre: genre,
      isSeries: isSeries,
      language: language,
      country: country,
      director: director,
      cast: cast,
      duration: duration,
      releaseYear: releaseYear,
      totalSeasons: totalSeasons,
      seasons: seasons
    }
    const newMovie = new Movie(data);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports.getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ sucess: true, data: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports.getOneMovie = async (req, res) => {
  try {
    const movies = await Movie.findById({ _id: req.params.id }).populate('genre');
    if (movies) {
      return res.status(200).json({ sucess: true, data: movies });
    }
    return res.status(404).json({ error: 'Movie Is not Found' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports.updateMovie = async (req, res) => {
  try {
    const findMovie = await Movie.findById(req.params.id);
    let titleImageUrl = []
    // let trailerUrl = []
    let logoUrl = []
    let imageUrl = []

    if (req.files.titleImage) {
      const imagePaths = req.files.titleImage.map((image) => image.path.replace(/\\/g, "/"));
      titleImageUrl = await uploadMultipleImages(
        imagePaths,
      );
    }

    if (req.files.image) {
      const imagePaths = req.files.image.map((image) => image.path.replace(/\\/g, "/"));
      imageUrl = await uploadMultipleImages(
        imagePaths,
      );
    }

    if (req.files.logo) {
      const imagePaths = req.files.logo.map((image) => image.path.replace(/\\/g, "/"));
      logoUrl = await uploadMultipleImages(
        imagePaths,
      );
    }

    // if (req.files.image) {
    //   const imagePaths = req.files.image.map((image) => image.path.replace(/\\/g, "/"));
    //   imageUrl = await uploadMultipleImages(
    //     imagePaths,
    //   );
    // }
    let data = {
      title: req.body.title || findMovie.title,
      description: req.body.description || findMovie.description,
      image: imageUrl.map((item) => item.secure_url) || null,
      titleImage: titleImageUrl.map((item) => item.secure_url) || null,
      trailer: findMovie.trailer,
      logo: logoUrl.map((item) => item.secure_url) || findMovie.logo,
      year: req.body.year || findMovie.year,
      limit: req.body.limit || findMovie.limit,
      genre: req.body.genre || findMovie.genre,
      isSeries: req.body.isSeries || findMovie.isSeries,
      language: req.body.language || findMovie.language,
      country: req.body.country || findMovie.country,
      director: req.body.director || findMovie.director,
      cast: req.body.cast || findMovie.cast,
      duration: req.body.duration || findMovie.duration,
      releaseYear: req.body.releaseYear || findMovie.releaseYear,
      totalSeasons: req.body.totalSeasons || findMovie.totalSeasons,
      seasons: req.body.seasons || findMovie.seasons
    }
    const movie = await Movie.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}