const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
