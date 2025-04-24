const Movie = require('../model/Movie');

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

exports.createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.status(201).json(newMovie);
};

exports.updateMovie = async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).end();
};