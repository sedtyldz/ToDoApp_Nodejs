
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const TaskRouter = require('./routes/tasks');  // API router'ını dahil ediyorum
const Task = require('./models/task');  // Task modelini dahil ediyorum

const app = express(); // Express uygulamasını oluşturuyoruz

// bu sayede http isteklerini işleyip request'in body kısmında gelen verilere erişebiliyoruz
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files for CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect('mongodb://localhost/todoApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Main page route
app.get('/', (req, res) => {
  res.render('index', { darkMode: false });  
});

// API Routes
app.use('/api/tasks', TaskRouter);

// Server listening
app.listen(3004, () => {
  console.log("Server running on http://localhost:3004");
});
