const { json } = require('express');
const Movie = require('../model/Movie.js');

module.exports = {
    createMovie: async (req, res) => {
        try {
            let newMovie = new Movie({
                movie: req.body.movie,
            })

            let savedMovieItem = await newMovie.save();

            res.json({
                data: savedMovieItem,
            })
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    getAllMovie: async (req, res) => {
        try {
            let allMovies = await Movie.find({});

            res.json({
                data: allMovies,
            })
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    deleteByID: async (req, res) => {
        try {
            let deletedMovie = await Movie.findOneAndDelete({
                _id: req.params.id,
            })
            res.json({
                data: deletedMovie,
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    },
    updateByID: async (req, res) => {
        try {
            let updatedMovie = await Movie.findByIdAndUpdate(
                {_id: req.params.id },
                {movie: req.body.movie},
                {new: true}
            )
            res.json({
                data: updatedMovie
            })
        } catch (e) {
            res.status(500).json({
                error: e.message,
            })
        }
    }
}