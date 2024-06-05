const Movie = require('../models/Movie'); // Adjust the path as necessary

exports.createMovie = async (req, res) => {
    const { movieId, title, poster_path, userId } = req.body;
    try {
        const newMovie = new Movie({ movieId, title, poster_path, userId });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getMoviesByUser = async (req, res) => {
    const userId = req.user.userId; // Extracted from the authenticated token

    try {
        const movies = await Movie.find({ userId: userId }).exec();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // Extracted from the authenticated token

    try {
        const movie = await Movie.findOne({ _id: id, userId: userId }).exec();
        if (!movie) {
            return res.status(404).json({ message: "Movie not found or you don't have permission to update this movie" });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // Extracted from the authenticated token

    try {
        // Attempt to delete the movie directly while ensuring it belongs to the user
        const result = await Movie.deleteOne({ _id: id, userId: userId }).exec();

        // If result.deletedCount is 0, it means no document was found with the given criteria
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Movie not found or you don't have permission to delete this movie" });
        }

        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

