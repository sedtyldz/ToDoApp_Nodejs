const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const TaskRouter = require('./routes/tasks');  // API router'ını dahil ediyorum
const Task = require('./models/task');  // Task modelini dahil ediyorum

const app = express();

// Body parser middleware
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

// Veritabanını temizleme fonksiyonu
async function clearAllData() {
  try {
    // Task modelinden tüm verileri silme
    await Task.deleteMany({});
    console.log("Tüm veriler silindi");
  } catch (error) {
    console.error("Veri silme sırasında hata oluştu", error);
  }
}

// Tüm görevleri temizlemek için route ekliyoruz
app.post('/clear-data', async (req, res) => {
  try {
    // MongoDB'deki tüm verileri sil
    const result = await Task.deleteMany({});
    
    // Eğer silme başarılıysa ve veritabanı boşsa
    if (result.deletedCount > 0) {
      res.status(200).send('Veriler başarıyla temizlendi');
    } else {
      // Eğer hiç veri silinmediyse
      res.status(404).send('Silinecek veri bulunamadı');
    }
  } catch (err) {
    console.error("Veri temizleme işlemi sırasında hata oluştu:", err);
    res.status(500).send('Veri temizleme işlemi başarısız');
  }
});

// Main page route
app.get('/', (req, res) => {
  res.render('index', { darkMode: false });  // Eğer darkMode verisi varsa burada true yapalım
});

// API Routes
app.use('/api/tasks', TaskRouter);

// Server listening
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});