const express = require("express")
const mongoose = require('mongoose');
const users = require("./models/mongo")
const Movies = require("./models/Movie")
const verifyToken = require('./middleware/authMiddleware');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users'); 
require('dotenv').config(); 
const connectDB = require('./models/database');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectDB();
const secretKey = process.env.SECRET_KEY;

app.use('/api/users', userRoutes);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
  
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); 
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body; 

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new users({
      name, // Save the name
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(201).json({ token, userId: newUser._id, name: newUser.name }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  app.get('/home', verifyToken, (req, res) => {
    res.json({ message: 'Protected data for home route' });
  });
  
  app.get('/browse', verifyToken, (req, res) => {
    res.json({ message: 'Protected data for browse route' });
  });
  
  app.get('/movie/:id', verifyToken, (req, res) => {
    res.json({ message: `Protected data for movie with id ${req.params.id}` });
  });

  const extractUserId = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token is required for authentication" });
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
  
  // POST - Add a new movie
  app.post('/movie', verifyToken, extractUserId, async (req, res) => {
    const { title, description } = req.body;
    try {
      const newMovie = new Movie({
        title,
        description,
        userId: req.userId 
      });
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // GET - Get all movies for the logged-in user
  app.get('/movies', verifyToken, extractUserId, async (req, res) => {
    try {
      const movies = await Movie.find({ userId: req.userId });
      res.json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // PUT - Update a movie
  app.put('/movie/:id', verifyToken, extractUserId, async (req, res) => {
    const { title, description } = req.body;
    try {
      const movie = await Movie.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { title, description }, { new: true });
      if (!movie) return res.status(404).json({ message: "Movie not found or user unauthorized to update this movie" });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // DELETE - Delete a movie
  app.delete('/movie/:id', verifyToken, extractUserId, async (req, res) => {
    try {
      const movie = await Movie.findOneAndDelete({ _id: req.params.id, userId: req.userId });
      if (!movie) return res.status(404).json({ message: "Movie not found or user unauthorized to delete this movie" });
      res.json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  const Movie = require('./models/Movie'); 
  


  app.get('/api/users/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  

app.use('/api', movieRoutes);

app.listen(8000,()=>{
    console.log("port connected");
})
