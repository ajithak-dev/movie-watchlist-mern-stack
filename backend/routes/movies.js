const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require('../middleware/authMiddleware'); 

// Protect the routes by applying verifyToken middleware
router.post('/movies', verifyToken, movieController.createMovie);
router.get('/movies', verifyToken, movieController.getMoviesByUser); 
router.put('/movies/:id', verifyToken, movieController.updateMovie);
router.delete('/movies/:id', verifyToken, movieController.deleteMovie);

module.exports = router;
