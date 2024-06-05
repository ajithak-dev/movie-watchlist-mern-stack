const mongoose = require("mongoose");


const movieSchema = new mongoose.Schema({
 
    movieId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    poster_path: String, 
    watched: {
      type: Boolean,
      default: false 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true
    }
  }, {
    timestamps: true 
  });
  

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

