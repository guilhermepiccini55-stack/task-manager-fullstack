const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/tasks.json');
e

function readTasks() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}
,
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

router.post('/', (req, res) => {
  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: req.body.title ?? tasks[taskIndex].title,
    done: req.body.done ?? tasks[taskIndex].done
  }; 

  tasks[taskIndex] = updatedTask;
  writeTasks(tasks);

  res.json(updatedTask);
});

router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const id = Number(req.params.id);

  const filtered = tasks.filter(task => task.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  writeTasks(filtered);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
