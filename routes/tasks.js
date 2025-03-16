const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET: /api/tasks -> Tüm görevleri al
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();  // MongoDB'den görevleri al
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// POST: /api/tasks -> Yeni görev ekle
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({
      task: req.body.task
    });

    await newTask.save();  // MongoDB'ye kaydet
    res.status(201).json(newTask);  // Görev başarıyla kaydedildiyse geri gönder
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// PUT: /api/tasks/:id -> Görevi güncelle
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// DELETE: /api/tasks/:id -> Görevi sil
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send('Task deleted');
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


// Tüm verileri silme (Yeni endpoint)
router.post('/clearAll', async (req, res) => {
    try {
      await Task.deleteMany();  // MongoDB'den tüm görevleri sil
      res.status(200).send('All tasks have been cleared.');
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;