const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie: {
        type: String,
    },
})

module.exports = mongoose.model('movie', movieSchema)