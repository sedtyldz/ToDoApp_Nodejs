const mongoose = require('mongoose');

// 3 adet veri tutacak şemamız içerik tarih yapılma durumu
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  // o anki tarihi gir veritabanına
  createdAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// veritabanında Task modelini oluşturma
const Task = mongoose.model('Task', taskSchema);
// modeli dışarı aktararak başka dosyalar tarafından kullanıma açtık
module.exports = Task;
