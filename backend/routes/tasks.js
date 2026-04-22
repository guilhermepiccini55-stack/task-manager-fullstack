const express = require('express');
const router = express.Router();

// Armazenamento em memória (sem arquivo JSON)
let tasks = [
  { id: 1, title: "Study Node.js", done: false },
  { id: 2, title: "Build backend project", done: true }
];

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: Date.now(),
    title: req.body.title.trim(),
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: req.body.title ?? tasks[taskIndex].title,
    done: req.body.done ?? tasks[taskIndex].done
  };

  res.json(tasks[taskIndex]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const filtered = tasks.filter(task => task.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks = filtered;
  res.json({ message: 'Task deleted' });
});

module.exports = router;
